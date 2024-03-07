import { Controller, HttpException, HttpStatus, Post, Body, Get, Query, NotImplementedException, Logger } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";
import GameService from "./game.service";
import { AnserwedQuestionDTO, GameQuestionDTO, QuizzResult, ResponseStartGameDTO, StartGameDTO, StateResponseDTO } from "./game.dto";
import { QuestionDTO } from "@app/common";
import { GameNotFoundException } from "../CustomException/Game/GameNotFound";
import { QuestionNotFoundException } from "../CustomException/Game/QuestionNotFound";
import EndGameException from "../CustomException/Game/EndGameException";
import ResponseNotFound from "../CustomException/Game/ResponseNotFound";
import { QuizzNotFoundException } from "../CustomException/Game/QuizzNotFound";

@Controller("/game")
export default class GameController {
  constructor(
    private readonly __gameService: GameService,
    private readonly __logger: Logger
  ) { }

  @Post("/start")
  @ApiOperation({
    tags: ["Game"],
    summary: "Start Game",
    description: "",
  })
  @ApiNotFoundResponse({
    description: "Quizz not found into quizz service",
    type: HttpException
  })
  @ApiOkResponse({
    description: "Return a game guid",
    type: ResponseStartGameDTO
  })
  public async startGame(@Body() response: StartGameDTO): Promise<ResponseStartGameDTO> {
    try {
      return await this.__gameService.fetchQuizzIntoQuizzService(response.id_quizz, response.user_name);
    }
    catch (err: any) {
      if (err instanceof QuizzNotFoundException) {
        this.__logger.log(err.message, "GameController : startGame")
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }
      else {
        this.__logger.error(err.message, null, "GameController : startGame");
        throw new HttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get("/question")
  @ApiOperation({
    tags: ["Questions"],
    summary: "Get next question",
    description: ""
  })
  @ApiNotFoundResponse({
    type: HttpException,
    description: "GUID Not Found"
  })
  @ApiOkResponse({
    type: QuestionDTO,
    description: ""
  })
  @ApiForbiddenResponse({
    description: "The given guid isn't found",
    type: HttpException
  })
  @ApiInternalServerErrorResponse({
    description: "There are an error between api and redis server",
    type: HttpException
  })
  public async getNextQuestion(@Query("guid") guid: string): Promise<GameQuestionDTO> {
    if (guid == null || guid == "") {
      throw new HttpException("GUID Not found", HttpStatus.NOT_FOUND);
    }
    try {
      return await this.__gameService.getNextQuestion(guid);
    }
    catch (err: any) {
      if (err instanceof GameNotFoundException) {
        this.__logger.warn(err.message, "GameController : getNextQuestion");
        throw new HttpException(err.message, HttpStatus.FORBIDDEN);
      }
      if (err instanceof QuestionNotFoundException) {
        this.__logger.warn(err.message, "GameController : getNextQuestion");
        throw new HttpException("Internal error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      else {
        this.__logger.error(err.message, null, "GameController : getNextQuestion");
        throw new HttpException("", HttpStatus.NOT_FOUND);
      }
    }
  }

  @Post("/question")
  @ApiOperation({
    tags: ["Questions"],
    summary: "Send response and get the result",
    description: "",
  })
  @ApiBody({
    description: "Object to send",
    type: AnserwedQuestionDTO
  })
  @ApiNotFoundResponse({
    description: "Id quizz or id quesion not found or id response not found",
    type: HttpException
  })
  @ApiBadRequestResponse({
    description: "The game is finished, you can't submit another response",
    type: HttpException
  })
  @ApiInternalServerErrorResponse({
    description: "There are an error between api and redis server",
    type: HttpException
  })
  @ApiUnauthorizedResponse({
    description: "This guis has expired or unvailable",
    type: HttpException
  })
  @ApiCreatedResponse({
    description: "Get response status",
    type: StateResponseDTO
  })
  public async sendResponse(@Body() response: AnserwedQuestionDTO): Promise<StateResponseDTO> {
    try {
      return await this.__gameService.answeredQuestion(response);
    }
    catch (err: any) {
      if (err instanceof EndGameException) {
        this.__logger.warn(err.message, "GameController : sendResponse");
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
      }
      if (err instanceof ResponseNotFound || err instanceof QuestionNotFoundException) {
        this.__logger.warn(err.message, "GameController : sendResponse");
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }
      if (err instanceof GameNotFoundException) {
        this.__logger.warn(err.message, "GameController : sendResponse");
        throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
      }
      else {
        this.__logger.error(err.message, null, "GameController : sendResponse");
        throw new HttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get("/result")
  @ApiOperation({
    tags: ["Questions"],
    summary: "Send quizz result",
    description: "This endpoint is used to send the quizz score",
  })
  @ApiUnauthorizedResponse({
    description: "The user can't reach its score",
    type: HttpException
  })
  @ApiOkResponse({
    description: "Give a score",
    type: QuizzResult
  })
  @ApiNotFoundResponse({
    description: "The guid was not found",
    type: HttpException
  })
  @ApiInternalServerErrorResponse({
    description: "There are an error between api and redis server",
    type: HttpException
  })
  public async sendResultQuizz(@Query("guid") guid: string): Promise<QuizzResult> {
    try {
      return await this.__gameService.getResult(guid);
    } catch (err: any) {
      if (err instanceof GameNotFoundException) {
        this.__logger.warn(err.message, "GameController : sendResultQuizz");
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }
      else {
        this.__logger.error(err.message, "GameController : sendResultQuizz");
        throw new HttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
