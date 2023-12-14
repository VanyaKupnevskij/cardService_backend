BEGIN;

SELECT *
    FROM records
    WHERE DATEDIFF(CURRENT_DATE(), date) <= 365;


COMMIT;