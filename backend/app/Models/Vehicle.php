<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['brand', 'model', 'license_plate', 'year', 'owner_id', 'price'];
    protected $dates = ['deleted_at'];
    
    public function owner()
    {
        return $this->belongsTo(Owner::class, 'owner_id');
    }

    public function ownershipHistories()
    {
        return $this->hasMany(VehicleOwnershipHistory::class);
    }
}
