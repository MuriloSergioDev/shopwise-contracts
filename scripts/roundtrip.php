<?php

declare(strict_types=1);

// Round-trips every example's data through its generated DTO (fromArray -> toArray) and fails on any difference.
// Each nullable top-level property is also tried as null, since examples usually carry a value.
// Run with `pnpm roundtrip` (docker, shopwise-php:base) or `php scripts/roundtrip.php` from the repo root.

spl_autoload_register(function (string $class): void {
    $prefix = 'Shopwise\\Contracts\\';
    if (str_starts_with($class, $prefix)) {
        $file = __DIR__.'/../php/src/'.str_replace('\\', '/', substr($class, strlen($prefix))).'.php';
        if (is_file($file)) {
            require $file;
        }
    }
});

$studly = fn (string $s): string => str_replace(['-', '_', '.'], '', ucwords($s, '-_.'));

// Assoc arrays are compared regardless of key order; lists keep theirs.
$normalize = function (mixed $v) use (&$normalize): mixed {
    if (! is_array($v)) {
        return $v;
    }
    $v = array_map($normalize, $v);
    if (! array_is_list($v)) {
        ksort($v);
    }

    return $v;
};

$isNullable = function (array $prop): bool {
    foreach ($prop['oneOf'] ?? $prop['anyOf'] ?? [$prop] as $branch) {
        if (in_array('null', (array) ($branch['type'] ?? []), true) || (array_key_exists('const', $branch) && $branch['const'] === null)) {
            return true;
        }
    }

    return false;
};

$root = dirname(__DIR__);
$errors = [];
$checked = 0;
foreach (glob("$root/examples/*.json") as $example) {
    $name = basename($example);
    $msg = json_decode(file_get_contents($example), true, flags: JSON_THROW_ON_ERROR);
    [$context, $event] = explode('.', $msg['type'], 2);
    $version = $msg['version'] ?? (int) preg_replace('/^.*\.v(\d+)\.json$/', '$1', $name);

    $class = null;
    foreach (['events' => 'Events', 'commands' => 'Commands'] as $dir => $kind) {
        $schemaPath = "$root/schemas/$dir/$context/$event.v$version.json";
        if (is_file($schemaPath)) {
            $class = "Shopwise\\Contracts\\$kind\\{$studly($context)}\\{$studly($event)}V$version";
            $schema = json_decode(file_get_contents($schemaPath), true, flags: JSON_THROW_ON_ERROR);
            break;
        }
    }
    if ($class === null || ! class_exists($class)) {
        $errors[] = "$name: no generated class for {$msg['type']} v$version";

        continue;
    }

    $cases = ['as is' => $msg['data']];
    foreach ($schema['properties'] ?? [] as $key => $prop) {
        if ($isNullable($prop)) {
            $cases["$key = null"] = [...$msg['data'], $key => null];
        }
    }

    foreach ($cases as $label => $data) {
        $checked++;
        try {
            $out = $class::fromArray($data)->toArray();
        } catch (Throwable $e) {
            $errors[] = "$name ($label): ".$e::class.': '.$e->getMessage();

            continue;
        }
        if ($normalize($out) !== $normalize($data)) {
            $errors[] = "$name ($label): toArray() differs\n  in:  ".json_encode($normalize($data))."\n  out: ".json_encode($normalize($out));
        }
    }
}

if ($errors !== []) {
    fwrite(STDERR, implode("\n", $errors)."\n");
    exit(1);
}
echo "round-tripped $checked case(s) from ".count(glob("$root/examples/*.json"))." example(s)\n";
