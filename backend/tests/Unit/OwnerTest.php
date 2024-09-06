<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Owner;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OwnerTest extends TestCase
{
    // use RefreshDatabase; //este borra los registros
    use DatabaseTransactions;

    #[\PHPUnit\Framework\Attributes\Test]
    public function it_can_create_an_owner()
    {
        // Arrange: Definir los datos del owner
        $data = [
            'name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@example.com',
        ];

        // Act: Crear el owner
        $owner = Owner::create($data);

        // Assert: Verificar que se haya creado en la base de datos
        $this->assertDatabaseHas('owners', [
            'name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@example.com',
        ]);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function it_can_update_an_owner()
    {
        // Arrange: Crear un owner
        $owner = Owner::factory()->create([
            'name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'janedoe@example.com',
        ]);

        // Definir los nuevos datos
        $updateData = [
            'name' => 'Jane Updated',
            'last_name' => 'Doe Updated',
            'email' => 'updated@example.com',
        ];

        // Act: Actualizar el owner
        $owner->update($updateData);

        // Assert: Verificar que los datos se actualizaron correctamente
        $this->assertDatabaseHas('owners', [
            'id' => $owner->id,
            'name' => 'Jane Updated',
            'last_name' => 'Doe Updated',
            'email' => 'updated@example.com',
        ]);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function it_can_delete_an_owner()
    {
        // Arrange: Crear un owner
        $owner = Owner::factory()->create([
            'name' => 'Delete',
            'last_name' => 'Me',
            'email' => 'delete@example.com',
        ]);

        // Act: Eliminar el owner
        $owner->delete();

        // Assert: Verificar que el owner ha sido eliminado suavemente
        $this->assertSoftDeleted('owners', [
            'id' => $owner->id,
        ]);
    }
}
