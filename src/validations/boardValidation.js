import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import logger from '~/config/logger'

const createNew = async(req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().min(3).max(50).required().trim().strict().messages({
            'string.empty': 'title is not allowed to be empty',
            'any.required': 'title is required',
            'string.min': 'title should have a minimum length of {#limit}',
            'string.max': 'title should have a maximum length of {#limit}',
        }),
        description: Joi.string().min(3).max(50).required().strict().messages({
            'string.empty': 'description is not allowed to be empty',
            'any.required': 'description is required',
            'string.min': 'description should have a minimum length of {#limit}',
            'string.max': 'description should have a maximum length of {#limit}',
        }),
    })

    try {
        // abortEarly: false -> trả về tất cả lỗi không chỉ lỗi đầu tiên
        await correctCondition.validateAsync(req.body, { abortEarly: false })

        //next()

        res
            .status(StatusCodes.CREATED)
            .json({ message: 'Post from validation: API post new board' })
    } catch (error) {
        logger.error(JSON.stringify(error.message, null, 2))

        console.log(error.details)

        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: error.details.map((err) => err.message),
        })
    }
}

export const boardValidation = {
    createNew,
}