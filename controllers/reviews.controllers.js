const reviews = require("../db/data/test-data/reviews");
const {
    fetchAllReviews,
    fetchReviewObject,
    fetchComments,
    insertComment,
    updateReview,
    insertReview,
} = require("../models/reviews.models");

function getReviews(req, res, next) {
    const { category, sort_by, order, limit, p } = req.query;

    fetchAllReviews(category, sort_by, order, limit, p)
        .then((reviews) => {
            Number(reviews.comment_count);
            res.status(200).send({ reviews });
        })
        .catch((err) => {
            next(err);
        });
}

function getReviewObject(req, res, next) {
    const { review_id } = req.params;
    fetchReviewObject(review_id)
        .then((review) => {
            res.status(200).send({ review });
        })
        .catch((err) => {
            next(err);
        });
}

function getComments(req, res, next) {
    const { review_id } = req.params;

    fetchComments(review_id)
        .then((comments) => {
            res.status(200).send({ comments });
        })
        .catch((err) => {
            next(err);
        });
}

function postComment(req, res, next) {
    const newComment = req.body;
    const { review_id } = req.params;
    insertComment(newComment, review_id)
        .then((comment) => {
            res.status(201).send({ comment });
        })
        .catch((err) => {
            next(err);
        });
}

function patchReview(req, res, next) {
    const { review_id } = req.params;
    const incrementValue = req.body;

    updateReview(review_id, incrementValue)
        .then((review) => {
            res.status(200).send(review);
        })
        .catch((err) => {
            next(err);
        });
}

function postReview(req, res, next) {
    const postedReview = req.body;

    insertReview(postedReview)
        .then((review) => {
            res.status(201).send({ review });
        })
        .catch((err) => {
            next(err);
        });
}

module.exports = {
    getReviews,
    getReviewObject,
    getComments,
    postComment,
    patchReview,
    postReview,
};
