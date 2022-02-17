module.exports = app => {
  categoryWithChildren: `
    WITH RECURSIVE aux (id)
    AS (
      SELECT id
      FROM categories
      WHERE id = ?
      UNION ALL
      SELECT c.id
      FROM categories c
           INNER JOIN aux x
           ON c.parentId = x.id
    );
    
    SELECT id
    FROM aux x
    ORDER BY seq;
  `;
}