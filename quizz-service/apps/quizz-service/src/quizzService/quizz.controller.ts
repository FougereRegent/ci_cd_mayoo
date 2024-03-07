import { QuizzDTO } from "@app/common";
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Post, Put } from "@nestjs/common";
import { ApiBadRequestResponse, ApiConflictResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import BadNumberOfQuestions from "../LogicExceptions/Quizz/BadNumberOfQuestions";
import BadQuizzName from "../LogicExceptions/Quizz/BadQuizzName";
import EmptyQuestion from "../LogicExceptions/Quizz/EmptyQuestion";
import NotFoundQuizzException from "../LogicExceptions/Quizz/NotFoundQuizzException";
import NumberOfGoodResponseException from "../LogicExceptions/Quizz/NumberOfGoodResponseException";
import NumberOfResponseException from "../LogicExceptions/Quizz/NumberOfResponseException";
import { QuizDateException } from "../LogicExceptions/Quizz/QuizDateException";
import QuizzAlreadyExist from "../LogicExceptions/Quizz/quizzAlreadyExist";
import { CreateQuizzDTO, SimpleQuizzDTO } from "./quizz.dto";
import QuizzService from "./quizz.service";

@Controller("quizz")
export class QuizzController {

  constructor(
    private readonly __quizzService: QuizzService,
    private readonly __logger: Logger
  ) { }

  @Get()
  @ApiOperation({ summary: "Retrieve all quizz", description: "", tags: ['Quizz'] })
  public async getAllQuizz(): Promise<SimpleQuizzDTO[]> {
    let result: Array<SimpleQuizzDTO> | null = await this.__quizzService.getAllQuizz()
    return result
  }

  @Post()
  @ApiOperation({
    summary: "Create Quizz",
    description: "This route allow you to create a quizz",
    tags: ['Quizz'],
  })
  @ApiBadRequestResponse({
    description: "Bad quizz name, Bad number of questions",
    type: HttpException
  })
  @ApiConflictResponse({
    description: "The quizz already exist",
    type: HttpException
  })
  @ApiInternalServerErrorResponse({
    description: "Internal Server Error",
    type: HttpException
  })
  public async postCreateQuizz(@Body() createQuizz: CreateQuizzDTO): Promise<null> {
    try {
      await this.__quizzService.createQuizz(createQuizz);
    }
    catch (err: any) {
      if (err instanceof BadQuizzName
        || err instanceof BadNumberOfQuestions
        || err instanceof EmptyQuestion
        || err instanceof QuizDateException
        || err instanceof NumberOfResponseException
        || err instanceof NumberOfGoodResponseException) {
        this.__logger.warn(err.message, "QuizzController : postCreateQuizz");
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
      if (err instanceof QuizzAlreadyExist) {
        this.__logger.warn(err.message, "QuizzController : postCreateQuizz");
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      }
      else {
        this.__logger.error(err.message, null, "QuizzController : postCreateQuizz")
        throw new HttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    return;
  }

  @Get(":id")
  @ApiOperation({
    summary: "Retrieve quizz by id",
    description: "",
    tags: ["Quizz"]
  })
  @ApiOkResponse({
    type: QuizzDTO,
    description: "Quizz schema"
  })
  @ApiNotFoundResponse({
    description: "Quizz id not found",
    type: HttpException
  })
  @ApiInternalServerErrorResponse({
    description: "Internal Server Error",
    type: HttpException
  })
  public async getQuizz(@Param("id") id: any): Promise<QuizzDTO> {
    let id_quizz: number = parseInt(id);
    if (Number.isNaN(id_quizz)) {
      this.__logger.warn(`${id} isn't a number`);
      throw new HttpException("Id is not a number", HttpStatus.BAD_REQUEST);
    }
    try {
      this.__logger.log(`Get quizz by id, Id : ${id}`, "QuizzController : getQuizz");
      let result: QuizzDTO = await this.__quizzService.getQuizzById(id_quizz);
      return result;
    }
    catch (err: any) {
      if (err instanceof NotFoundQuizzException) {
        this.__logger.warn(err.message, "QuizzController : getQuizz");
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }
      else {
        this.__logger.error(err.message, null, "QuizzController : getQuizz");
        throw new HttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a quizz by id",
    description: "",
    tags: ["Quizz"]
  })
  @ApiNotFoundResponse({
    description: "Quizz id not found",
    type: HttpException
  })
  @ApiBadRequestResponse({
    description: "Bad id type",
    type: HttpException
  })
  @ApiInternalServerErrorResponse({
    description: "Internal Server Error",
    type: HttpException
  })
  public async deleteQuizz(@Param("id") id: any): Promise<void> {
    let id_quizz: number = parseInt(id);
    if (isNaN(id)) {
      throw new HttpException("Bad id type", HttpStatus.BAD_REQUEST);
    }
    try {
      await this.__quizzService.deleteQuizz(id_quizz);
    }
    catch (err: any) {
      if (err instanceof NotFoundQuizzException) {
        this.__logger.log(err.message, "QuizzController : deleteQuizz");
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }
      else {
        this.__logger.error(err.message, null, "QuizzController : deleteQuizz")
        throw new HttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Put()
  @ApiOperation({
    summary: "Update Quizz",
    description: "",
    tags: ["Quizz"]
  })
  @ApiNotFoundResponse({
    description: "Quizz id not found",
    type: HttpException
  })
  @ApiBadRequestResponse({
    description: "Bad id type",
    type: HttpException
  })
  @ApiInternalServerErrorResponse({
    description: "Internal Server Error",
    type: HttpException
  })
  public async updateQuizz(@Body() quizz: QuizzDTO): Promise<void> {
    try {
      await this.__quizzService.updateQuizz(quizz);
    }
    catch (err: any) {
      if (err instanceof BadQuizzName
        || err instanceof BadNumberOfQuestions
        || err instanceof EmptyQuestion
        || err instanceof QuizDateException
        || err instanceof NumberOfResponseException
        || err instanceof NumberOfGoodResponseException) {
        this.__logger.warn(err.message, "QuizzController : putUpdateQuizz");
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
      else {
        this.__logger.error(err.message, null, "QuizzController : putUpdateQuizz")
        throw new HttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

}
