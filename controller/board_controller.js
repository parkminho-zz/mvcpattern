const express = require('express');
const router = express.Router();
const boardmodel = require('../models/board_model')

exports.getboardlist = async(req,res) => {
    let page = req.query.page;
    page = typeof page === 'undefined' ? 1 : page ;
    const boardlist = await boardmodel.getAllListBoard();
    const paginglist = await boardmodel.pagingListBoard(page);
    const rowcount = Math.ceil(boardlist.length/10); 
    res.render('board',{paginglist,rowcount})
}

exports.boardcreateform = async(req,res) => {
    res.render('write');
}

exports.boardcreate = async(req,res) => {
    const { title, content, writer } = req.body
    await boardmodel.createBoard(title, content, writer);
    res.redirect('/board/list')
}

exports.getdetailboardlist = async(req,res) => {
    const board_num = req.params.board_num;
    const detailboardlist = await boardmodel.getDetailListBoard(board_num);
    res.render('read',{detailboardlist, board_num})
}

exports.getsearchboard = async(req,res) => {
    const type = req.query.type
    const val = req.query.val
    try{
        const boardsearch = await boardmodel.getSearchboard(type,val)
        res.render('search', {boardsearch})
    } catch (error) {
        console.error(error);
        res.status(500).render('error');
    }
}

exports.getmodifyboard = async(req,res) => {
    const board_num = req.params.board_num;
    const detailboardlist = await boardmodel.getDetailListBoard(board_num);
    const title = detailboardlist[0]?.title;
    const content = detailboardlist[0]?.content;
    res.render('modify',{title, content, board_num});
}

exports.postmodifyboard = async(req,res) => {
    const title = req.body.title;
    const content = req.body.content;
    const board_num = req.params.board_num;
    await boardmodel.modifyBoard(board_num, title, content)
    res.redirect(`/board/${board_num}`);
}

exports.postdeleteboard = async(req,res) => {
    const board_num = req.params.board_num;
    await boardmodel.deleteBoard(board_num);
    res.redirect(`/board/list`);
}