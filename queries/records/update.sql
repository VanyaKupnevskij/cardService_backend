BEGIN;

SET @date = ?;
SET @production_valumes = ?;
SET @unit_price = ?;
SET @unit_cost = ?;
SET @meterials_cost = ?;
SET @energy_cost = ?;
SET @equipment_cost = ?;
SET @amortization = ?;
SET @marketing = ?;
SET @labor_cost = ?;
SET @transportation_cost = ?;
SET @insurance = ?;
SET @taxation = ?;

UPDATE records 
    SET date = @date, 
        production_valumes = @production_valumes, 
        unit_price = @unit_price, 
        unit_cost = @unit_cost,
        meterials_cost = @meterials_cost,
        energy_cost = @energy_cost,
        equipment_cost = @equipment_cost,
        amortization = @amortization,
        marketing = @marketing,
        labor_cost = @labor_cost,
        transportation_cost = @transportation_cost,
        insurance = @insurance,
        taxation = @taxation
    WHERE id = ?;

COMMIT;