const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllListBoard = async() => {
    try{        
        const getAllList= await prisma.board.findMany();
        return getAllList;
    } catch(error) {
        console.error(error);
        res.status(500).send('server error');
    }
}

exports.createBoard = async(title, content, writer) => {
    try{
        const createBoard = await prisma.board.create({
            data: {
                title: title,
                content: content,
                writer: writer
            },
        })
        return createBoard;
    } catch(error) {
        console.error(error);
        res.status(500).send('server error');
    }
}

exports.getDetailListBoard = async(board_num) => {
    try{
        const detailListBoard = await prisma.board.findMany({
            where: {
                board_num: parseInt(board_num),
            }
        })
        return detailListBoard;
    } catch(error) {
        console.error(error);
        res.status(500).send('server error');
    }
}

exports.pagingListBoard = async(page) => {
    try{
        const pagingList = await prisma.board.findMany({
            skip: (page - 1) * 10 ,
            take: 10,
            orderBy: {
                board_num: 'asc'
            }
        })
        return pagingList;
    } catch(error) {
        console.error(error);
        res.status(500).send('server error');
    }
}

exports.getSearchboard = async(type, val) => {
    try{
        let searchboard ;        
        switch(type) {
            case 'board':
                if(!isNaN(parseInt(val))){
                    searchboard = await prisma.board.findMany({
                        where:{
                            board_num: parseInt(val),
                        },
                    });
                } else {
                    throw new Error('error');
                }
                break;
            case 'title_content':
                searchboard = await prisma.board.findMany({
                    where:{
                        OR: [                            
                            { title: val },
                            { content: val },
                        ]
                    },
                });
                break;
            case 'writer':
                searchboard = await prisma.board.findMany({
                    where:{
                        writer: val,
                    },
                });
                break;
            default:
                throw new Error('Invalid type');
        }
        return searchboard;
    } catch(error) {
        throw new Error('error');
    }
}

exports.modifyBoard = async(board_num, title, content) => {
    try{
        const modify = await prisma.board.update({
            where: {
                board_num : parseInt(board_num),
            },
            data: {
                title: title,
                content: content,
            },
        })
        return modify;
    } catch(error) {
        console.error(error);
        res.status(500).send('server error');
    }
}

exports.deleteBoard = async(board_num) => {
    try{
        const deleteboard = await prisma.board.delete({
            where: {
                board_num : parseInt(board_num),
            }
        })
        return deleteboard;
    } catch(error) {
        console.error(error);
        res.status(500).send('server error');
    }
}