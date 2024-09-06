<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Owner extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $dates = ['deleted_at'];
    protected $fillable = ['name', 'last_name', 'email'];

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class, 'owner_id');
    }

    public function ownershipHistories()
    {
        return $this->hasMany(VehicleOwnershipHistory::class);
    }

    // Si se elimina un owner, se debe hacer soft deleting de los vehiculos asociados
    protected static function booted()
    {
        static::deleting(function ($owner) {
            if ($owner->isForceDeleting()) {
                $owner->vehicles()->forceDelete();
            } else {
                $owner->vehicles()->delete();
            }
        });
    }
}
