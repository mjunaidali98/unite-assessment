const db = require("../../database");

const getAllArticles = (done) => {
    const results = [];

    db.each(
        "SELECT * FROM articles",
        [],
        (err, row) => {
            if (err) console.log("Something went wrong: " + err);


            results.push({
                article_id: row.article_id,
                title: row.title,
                author: row.author,
                date_published: new Date(row.date_published).toLocaleDateString(),
                date_edited: new Date(row.date_edited).toLocaleDateString(),
                article_text: row.article_text
            });

        },
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
    )

}

const addNewArticle = (article, done) => {


    const sql = `INSERT INTO articles (title, author, date_published, date_edited, article_text, created_by) VALUES (?,?,?,?,?,?)`;
    let values = [article.title, article.author, Date.now(), Date.now(), article.article_text, 1];

    db.run(
        sql,
        values,
        function (err) {
            if (err) return done(err, null);

            return done(null, this.lastID);

        }
    )

}

const updateArticle = (id, article, done) => {
    const sql = `UPDATE articles SET title=?,author=?, article_text=?  WHERE article_id=?`
    let values = [article.title, article.author, article.article_text, id];
    db.run(sql, values, (err) => {
        return done(err)
    })




}
const deleteSingleArticle = (id, done) => {
    const sql = `DELETE FROM articles WHERE article_id=?`

    db.run(sql, [id], (err) => {
        if (err) {
            return err
        }
        else {
            done("Removed")
        }

    })




}

const getSingleArticle = (id, result) => {
    const sql = `SELECT * FROM articles WHERE article_id=?`

    db.get(sql, [id], (err, row) => {

        if (err) return result(err)
        if (!row) return result(404)


        return result(null, {



            article_id: row.article_id,
            title: row.title,
            author: row.author,
            date_published: new Date(row.date_published).toLocaleDateString(),
            date_edited: new Date(row.date_edited).toLocaleDateString(),
            article_text: row.article_text
        })




    })

}



module.exports = {
    getAllArticles: getAllArticles,
    addNewArticle: addNewArticle,
    getSingleArticle: getSingleArticle,
    updateArticle: updateArticle,
    deleteSingleArticle: deleteSingleArticle
}