<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Owner;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OwnerTest extends TestCase
{
    use RefreshDatabase;

    #[\PHPUnit\Framework\Attributes\Test]
    public function it_can_create_an_owner()
    {
        // Arrange: Definir los datos del owner
        $data = [
            'name' => 'Nicolas',
            'last_name' => 'Araya',
            'email' => 'nicolas@mail.com',
        ];

        // Act: Crear el owner
        $owner = Owner::create($data);

        // Assert: Verificar que se haya creado en la base de datos
        $this->assertDatabaseHas('owners', [
            'name' => 'Nicolas',
            'last_name' => 'Araya',
            'email' => 'nicolas@mail.com',
        ]);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function it_can_update_an_owner()
    {
        // Arrange: Crear un owner
        $owner = Owner::factory()->create([
            'name' => 'Nicolas',
            'last_name' => 'Araya',
            'email' => 'nicolas@mail.com',
        ]);

        // Definir los nuevos datos
        $updateData = [
            'name' => 'Nicolas Updated',
            'last_name' => 'Araya Updated',
            'email' => 'nicolasUpdated@mail.com',
        ];

        // Act: Actualizar el owner
        $owner->update($updateData);

        // Assert: Verificar que los datos se actualizaron correctamente
        $this->assertDatabaseHas('owners', [
            'id' => $owner->id,
            'name' => 'Nicolas Updated',
            'last_name' => 'Araya Updated',
            'email' => 'nicolasUpdated@mail.com',
        ]);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function it_can_delete_an_owner()
    {
        // Arrange: Crear un owner
        $owner = Owner::factory()->create([
            'name' => 'Nicolas',
            'last_name' => 'Araya',
            'email' => 'nicolas@mail.com',
        ]);

        // Act: Eliminar el owner
        $owner->delete();

        // Assert: Verificar que el owner ha sido eliminado
        $this->assertDatabaseMissing('owners', [
            'id' => $owner->id,
        ]);
    }
}
