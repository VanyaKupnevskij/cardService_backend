BEGIN;

SELECT * 
    FROM records 
    WHERE records.id = ?;

COMMIT;