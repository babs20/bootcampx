SELECT day, COUNT(*) AS total_assigments
FROM assignments
GROUP BY day
HAVING COUNT(*) >= 10
ORDER BY day;