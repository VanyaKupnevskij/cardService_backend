BEGIN;

SELECT * 
    FROM records 
    ORDER BY records.date DESC;

COMMIT;