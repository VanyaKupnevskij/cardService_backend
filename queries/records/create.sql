BEGIN;

SET @id = ?;
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

INSERT INTO records 
        (id, 
        date, 
        production_valumes, 
        unit_price, 
        unit_cost, 
        meterials_cost, 
        energy_cost, 
        equipment_cost, 
        amortization, 
        marketing, 
        labor_cost, 
        transportation_cost, 
        insurance, 
        taxation) 
VALUES (@id, 
        @date, 
        @production_valumes, 
        @unit_price, 
        @unit_cost, 
        @meterials_cost, 
        @energy_cost, 
        @equipment_cost, 
        @amortization, 
        @marketing, 
        @labor_cost, 
        @transportation_cost, 
        @insurance, 
        @taxation);

COMMIT;