import { QuizzDTO } from "@app/common";
import { Test } from "@nestjs/testing";
import BadNumberOfQuestions from "./LogicExceptions/Quizz/BadNumberOfQuestions";
import BadQuizzName from "./LogicExceptions/Quizz/BadQuizzName";
import EmptyQuestion from "./LogicExceptions/Quizz/EmptyQuestion";
import NumberOfResponseException from "./LogicExceptions/Quizz/NumberOfResponseException";
import { QuizDateException } from "./LogicExceptions/Quizz/QuizDateException";
import ResponseIsEmptyException from "./LogicExceptions/Quizz/ResponseIsEmptyException";
import QuizzAlreadyExist from "./LogicExceptions/Quizz/quizzAlreadyExist";
import { PrismaService } from "./prisma.service";
import { CreateQuestionsDTO, CreateQuizzDTO } from "./quizzService/quizz.dto";
import QuizzEntity from "./quizzService/quizz.entity";
import QuizzService from "./quizzService/quizz.service";

describe("QuizzController", () => {
  let quizzService: QuizzService;
  let quizzEntity: QuizzEntity;
  let question: CreateQuestionsDTO[];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [QuizzService, QuizzEntity, PrismaService],
    }).compile();

    quizzService = moduleRef.get<QuizzService>(QuizzService);
    quizzEntity = moduleRef.get<QuizzEntity>(QuizzEntity);

    question = [
      {
        "question": "Quel est l'ingrédient de base utilisé pour faire la pâte des lasagnes ?",
        "responses": [
          { "response": "Farine", "good_response": true },
          { "response": "Semoule", "good_response": false },
          { "response": "Œufs", "good_response": false },
          { "response": "Levure", "good_response": false }
        ]
      },
      {
        "question": "Quelle est la principale viande utilisée dans les lasagnes traditionnelles ?",
        "responses": [
          { "response": "Poulet", "good_response": false },
          { "response": "Porc", "good_response": false },
          { "response": "Bœuf", "good_response": true },
          { "response": "Agneau", "good_response": false }
        ]
      },
      {
        "question": "Quel type de fromage est souvent saupoudré entre les couches de lasagnes ?",
        "responses": [
          { "response": "Gruyère", "good_response": false },
          { "response": "Parmesan", "good_response": true },
          { "response": "Cheddar", "good_response": false },
          { "response": "Mozzarella", "good_response": false }
        ]
      },
      {
        "question": "Quel légume est généralement inclus dans la sauce des lasagnes ?",
        "responses": [
          { "response": "Carottes", "good_response": false },
          { "response": "Courgettes", "good_response": false },
          { "response": "Épinards", "good_response": true },
          { "response": "Poivrons", "good_response": false }
        ]
      },
      {
        "question": "Combien de couches de pâte les lasagnes traditionnelles italiennes peuvent-elles avoir ?",
        "responses": [
          { "response": "Deux", "good_response": false },
          { "response": "Quatre", "good_response": true },
          { "response": "Six", "good_response": false },
          { "response": "Huit", "good_response": false }
        ]
      },
      {
        "question": "Quelle est la fonction de la béchamel dans les lasagnes ?",
        "responses": [
          { "response": "Donner de la saveur", "good_response": false },
          { "response": "Ajouter de la couleur", "good_response": false },
          { "response": "Apporter de la consistance", "good_response": true },
          { "response": "Accentuer le goût sucré", "good_response": false }
        ]
      },
      {
        "question": "Quel est l'origine géographique des lasagnes ?",
        "responses": [
          { "response": "France", "good_response": false },
          { "response": "Italie", "good_response": true },
          { "response": "Espagne", "good_response": false },
          { "response": "Grèce", "good_response": false }
        ]
      },
      {
        "question": "Quel est l'assaisonnement communément utilisé dans la sauce tomate des lasagnes ?",
        "responses": [
          { "response": "Basilic", "good_response": true },
          { "response": "Thym", "good_response": false },
          { "response": "Romarin", "good_response": false },
          { "response": "Menthe", "good_response": false }
        ]
      },
      {
        "question": "Quelle est la différence entre les lasagnes et la pasticcio, une variante grecque ?",
        "responses": [
          { "response": "La viande utilisée", "good_response": true },
          { "response": "Le type de pâte", "good_response": false },
          { "response": "La présence de béchamel", "good_response": false },
          { "response": "La méthode de cuisson", "good_response": false }
        ]
      },
      {
        "question": "Quel est l'élément essentiel pour rendre les lasagnes plus croustillantes sur le dessus ?",
        "responses": [
          { "response": "Chapelure", "good_response": true },
          { "response": "Sucre", "good_response": false },
          { "response": "Sel", "good_response": false },
          { "response": "Poivre", "good_response": false }
        ]
      },
      {
        "question": "Combien de temps faut-il généralement pour cuire des lasagnes au four ?",
        "responses": [
          { "response": "20 minutes", "good_response": false },
          { "response": "40 minutes", "good_response": false },
          { "response": "60 minutes", "good_response": true },
          { "response": "80 minutes", "good_response": false }
        ]
      },
      {
        "question": "Quel est l'avantage de laisser reposer les lasagnes avant de les servir ?",
        "responses": [
          { "response": "Meilleure saveur", "good_response": true },
          { "response": "Meilleure texture", "good_response": false },
          { "response": "Meilleure présentation", "good_response": false },
          { "response": "Toutes les réponses ci-dessus", "good_response": false }
        ]
      }
    ];
  });

  describe("Get quizz", () => {
    it("Get existing quizz", async () => {
      const result: QuizzDTO[] = [{
        "id": 0,
        "name": "Lasagne Quizz",
        "description": "Test de la description",
        "start_date": new Date("2022-03-08T00:00:00.000Z"),
        "end_date": new Date("2022-03-09T00:00:00.000Z"),
        "questions": [
          {
            "id": 0,
            "question": "Quel est l'ingrédient de base utilisé pour faire la pâte des lasagnes ?",
            "responses": [
              { "id": 0, "response": "Farine", "good_response": true },
              { "id": 1, "response": "Semoule", "good_response": false },
              { "id": 2, "response": "Œufs", "good_response": false },
              { "id": 3, "response": "Levure", "good_response": false }
            ]
          },
          {
            "id": 1,
            "question": "Quelle est la principale viande utilisée dans les lasagnes traditionnelles ?",
            "responses": [
              { "id": 0, "response": "Poulet", "good_response": false },
              { "id": 1, "response": "Porc", "good_response": false },
              { "id": 2, "response": "Bœuf", "good_response": true },
              { "id": 3, "response": "Agneau", "good_response": false }
            ]
          },
          {
            "id": 2,
            "question": "Quel type de fromage est souvent saupoudré entre les couches de lasagnes ?",
            "responses": [
              { "id": 0, "response": "Gruyère", "good_response": false },
              { "id": 1, "response": "Parmesan", "good_response": true },
              { "id": 2, "response": "Cheddar", "good_response": false },
              { "id": 3, "response": "Mozzarella", "good_response": false }
            ]
          },
          {
            "id": 3,
            "question": "Quel légume est généralement inclus dans la sauce des lasagnes ?",
            "responses": [
              { "id": 0, "response": "Carottes", "good_response": false },
              { "id": 1, "response": "Courgettes", "good_response": false },
              { "id": 2, "response": "Épinards", "good_response": true },
              { "id": 3, "response": "Poivrons", "good_response": false }
            ]
          },
          {
            "id": 4,
            "question": "Combien de couches de pâte les lasagnes traditionnelles italiennes peuvent-elles avoir ?",
            "responses": [
              { "id": 0, "response": "Deux", "good_response": false },
              { "id": 1, "response": "Quatre", "good_response": true },
              { "id": 2, "response": "Six", "good_response": false },
              { "id": 3, "response": "Huit", "good_response": false }
            ]
          },
          {
            "id": 5,
            "question": "Quelle est la fonction de la béchamel dans les lasagnes ?",
            "responses": [
              { "id": 0, "response": "Donner de la saveur", "good_response": false },
              { "id": 1, "response": "Ajouter de la couleur", "good_response": false },
              { "id": 2, "response": "Apporter de la consistance", "good_response": true },
              { "id": 3, "response": "Accentuer le goût sucré", "good_response": false }
            ]
          },
          {
            "id": 6,
            "question": "Quel est l'origine géographique des lasagnes ?",
            "responses": [
              { "id": 0, "response": "France", "good_response": false },
              { "id": 1, "response": "Italie", "good_response": true },
              { "id": 2, "response": "Espagne", "good_response": false },
              { "id": 3, "response": "Grèce", "good_response": false }
            ]
          },
          {
            "id": 7,
            "question": "Quel est l'assaisonnement communément utilisé dans la sauce tomate des lasagnes ?",
            "responses": [
              { "id": 0, "response": "Basilic", "good_response": true },
              { "id": 1, "response": "Thym", "good_response": false },
              { "id": 2, "response": "Romarin", "good_response": false },
              { "id": 3, "response": "Menthe", "good_response": false }
            ]
          },
          {
            "id": 8,
            "question": "Quelle est la différence entre les lasagnes et la pasticcio, une variante grecque ?",
            "responses": [
              { "id": 0, "response": "La viande utilisée", "good_response": true },
              { "id": 1, "response": "Le type de pâte", "good_response": false },
              { "id": 2, "response": "La présence de béchamel", "good_response": false },
              { "id": 3, "response": "La méthode de cuisson", "good_response": false }
            ]
          },
          {
            "id": 9,
            "question": "Quel est l'élément essentiel pour rendre les lasagnes plus croustillantes sur le dessus ?",
            "responses": [
              { "id": 0, "response": "Chapelure", "good_response": true },
              { "id": 1, "response": "Sucre", "good_response": false },
              { "id": 2, "response": "Sel", "good_response": false },
              { "id": 3, "response": "Poivre", "good_response": false }
            ]
          },
          {
            "id": 10,
            "question": "Combien de temps faut-il généralement pour cuire des lasagnes au four ?",
            "responses": [
              { "id": 0, "response": "20 minutes", "good_response": false },
              { "id": 1, "response": "40 minutes", "good_response": false },
              { "id": 2, "response": "60 minutes", "good_response": true },
              { "id": 3, "response": "80 minutes", "good_response": false }
            ]
          },
          {
            "id": 11,
            "question": "Quel est l'avantage de laisser reposer les lasagnes avant de les servir ?",
            "responses": [
              { "id": 0, "response": "Meilleure saveur", "good_response": false },
              { "id": 1, "response": "Meilleure texture", "good_response": false },
              { "id": 2, "response": "Meilleure présentation", "good_response": true },
              { "id": 3, "response": "Toutes les réponses ci-dessus", "good_response": false }
            ]
          }
        ]
      }];
      const mock_result: any[] = [{
        "id": 0,
        "quizzName": "Lasagne Quizz",
        "description": "Test de la description",
        "start_date": new Date("2022-03-08T00:00:00.000Z"),
        "end_date": new Date("2022-03-09T00:00:00.000Z"),
        created_at: "2023-12-11",
        questions: [{
          "id": 0,
          "questions": "Quel est l'ingrédient de base utilisé pour faire la pâte des lasagnes ?",
          "responses": [
            { "id": 0, "response": "Farine", "good_response": true },
            { "id": 1, "response": "Semoule", "good_response": false },
            { "id": 2, "response": "Œufs", "good_response": false },
            { "id": 3, "response": "Levure", "good_response": false }
          ]
        },
        {
          "id": 1,
          "questions": "Quelle est la principale viande utilisée dans les lasagnes traditionnelles ?",
          "responses": [
            { "id": 0, "response": "Poulet", "good_response": false },
            { "id": 1, "response": "Porc", "good_response": false },
            { "id": 2, "response": "Bœuf", "good_response": true },
            { "id": 3, "response": "Agneau", "good_response": false }
          ]
        },
        {
          "id": 2,
          "questions": "Quel type de fromage est souvent saupoudré entre les couches de lasagnes ?",
          "responses": [
            { "id": 0, "response": "Gruyère", "good_response": false },
            { "id": 1, "response": "Parmesan", "good_response": true },
            { "id": 2, "response": "Cheddar", "good_response": false },
            { "id": 3, "response": "Mozzarella", "good_response": false }
          ]
        },
        {
          "id": 3,
          "questions": "Quel légume est généralement inclus dans la sauce des lasagnes ?",
          "responses": [
            { "id": 0, "response": "Carottes", "good_response": false },
            { "id": 1, "response": "Courgettes", "good_response": false },
            { "id": 2, "response": "Épinards", "good_response": true },
            { "id": 3, "response": "Poivrons", "good_response": false }
          ]
        },
        {
          "id": 4,
          "questions": "Combien de couches de pâte les lasagnes traditionnelles italiennes peuvent-elles avoir ?",
          "responses": [
            { "id": 0, "response": "Deux", "good_response": false },
            { "id": 1, "response": "Quatre", "good_response": true },
            { "id": 2, "response": "Six", "good_response": false },
            { "id": 3, "response": "Huit", "good_response": false }
          ]
        },
        {
          "id": 5,
          "questions": "Quelle est la fonction de la béchamel dans les lasagnes ?",
          "responses": [
            { "id": 0, "response": "Donner de la saveur", "good_response": false },
            { "id": 1, "response": "Ajouter de la couleur", "good_response": false },
            { "id": 2, "response": "Apporter de la consistance", "good_response": true },
            { "id": 3, "response": "Accentuer le goût sucré", "good_response": false }
          ]
        },
        {
          "id": 6,
          "questions": "Quel est l'origine géographique des lasagnes ?",
          "responses": [
            { "id": 0, "response": "France", "good_response": false },
            { "id": 1, "response": "Italie", "good_response": true },
            { "id": 2, "response": "Espagne", "good_response": false },
            { "id": 3, "response": "Grèce", "good_response": false }
          ]
        },
        {
          "id": 7,
          "questions": "Quel est l'assaisonnement communément utilisé dans la sauce tomate des lasagnes ?",
          "responses": [
            { "id": 0, "response": "Basilic", "good_response": true },
            { "id": 1, "response": "Thym", "good_response": false },
            { "id": 2, "response": "Romarin", "good_response": false },
            { "id": 3, "response": "Menthe", "good_response": false }
          ]
        },
        {
          "id": 8,
          "questions": "Quelle est la différence entre les lasagnes et la pasticcio, une variante grecque ?",
          "responses": [
            { "id": 0, "response": "La viande utilisée", "good_response": true },
            { "id": 1, "response": "Le type de pâte", "good_response": false },
            { "id": 2, "response": "La présence de béchamel", "good_response": false },
            { "id": 3, "response": "La méthode de cuisson", "good_response": false }
          ]
        },
        {
          "id": 9,
          "questions": "Quel est l'élément essentiel pour rendre les lasagnes plus croustillantes sur le dessus ?",
          "responses": [
            { "id": 0, "response": "Chapelure", "good_response": true },
            { "id": 1, "response": "Sucre", "good_response": false },
            { "id": 2, "response": "Sel", "good_response": false },
            { "id": 3, "response": "Poivre", "good_response": false }
          ]
        },
        {
          "id": 10,
          "questions": "Combien de temps faut-il généralement pour cuire des lasagnes au four ?",
          "responses": [
            { "id": 0, "response": "20 minutes", "good_response": false },
            { "id": 1, "response": "40 minutes", "good_response": false },
            { "id": 2, "response": "60 minutes", "good_response": true },
            { "id": 3, "response": "80 minutes", "good_response": false }
          ]
        },
        {
          "id": 11,
          "questions": "Quel est l'avantage de laisser reposer les lasagnes avant de les servir ?",
          "responses": [
            { "id": 0, "response": "Meilleure saveur", "good_response": false },
            { "id": 1, "response": "Meilleure texture", "good_response": false },
            { "id": 2, "response": "Meilleure présentation", "good_response": true },
            { "id": 3, "response": "Toutes les réponses ci-dessus", "good_response": false }
          ]
        }
        ]
      }];

      jest.spyOn(quizzEntity, "getQuizzById").mockImplementation(async (id) => await mock_result[id]);

      expect(await quizzService.getQuizzById(0)).toEqual(result[0]);
    });

    it("Bad quizz id", async () => {
      jest.spyOn(quizzEntity, "getQuizzById").mockResolvedValue(null);

      try {
      } catch (e) {
        expect(e).toEqual(new Error("Quizz not found"));
      }
    });
  });

  describe("Create Quizz", () => {

    it("Create quizz", async () => {
      const quizz: CreateQuizzDTO = {
        "name": "Lasagne Quizz",
        "description": "Lasagne",
        "start_date": new Date("2022-03-08T00:00:00.000Z"),
        "end_date": new Date("2022-03-09T00:00:00.000Z"),
        "questions": question
      };

      jest.spyOn(quizzEntity, "createQuizz").mockImplementation(() => null);
      jest.spyOn(quizzEntity, "getQuizzByName").mockImplementation(() => null);

      await quizzService.createQuizz(quizz);
    });

    it("Quizz already Exist", async () => {
      const quizz: CreateQuizzDTO = {
        "name": "Lasagne Quizz",
        "description": "Lasagne",
        "start_date": new Date("2022-03-08T00:00:00.000Z"),
        "end_date": new Date("2022-03-09T00:00:00.000Z"),
        "questions": question
      };

      jest.spyOn(quizzEntity, "getQuizzByName").mockResolvedValue("Lasagne");

      try {
        await quizzService.createQuizz(quizz);
      }
      catch (err) {
        expect(err).toEqual(new QuizzAlreadyExist(quizz.name));
      }
    });

    it("Check Number of questions", async () => {
      jest.spyOn(quizzEntity, "getQuizzByName").mockImplementation(() => null);
      const quizz: CreateQuizzDTO = {
        "name": "Lasagne Quizz",
        "description": "Lasagne",
        "start_date": new Date("2022-03-08T00:00:00.000Z"),
        "end_date": new Date("2022-03-09T00:00:00.000Z"),
        "questions": [
          {
            "question": "Quel est l'ingrédient de base utilisé pour faire la pâte des lasagnes ?",
            "responses": [
              { "response": "Farine", "good_response": true },
              { "response": "Semoule", "good_response": false },
              { "response": "Œufs", "good_response": false },
              { "response": "Levure", "good_response": false }
            ]
          }]
      };
      try {
        await quizzService.createQuizz(quizz);
      }
      catch (err) {
        expect(err).toEqual(new BadNumberOfQuestions(quizz.questions.length, 12));
      }
    });

    it("Check empty name", async () => {
      jest.spyOn(quizzEntity, "getQuizzByName").mockImplementation(() => null);
      const quizz: CreateQuizzDTO = {
        name: "",
        description: "Lasagne",
        start_date: new Date("2022-03-08T00:00:00.000Z"),
        end_date: new Date("2022-03-09T00:00:00.000Z"),
        questions: question
      };

      try {
        await quizzService.createQuizz(quizz);
      }
      catch (err) {
        expect(err).toEqual(new BadQuizzName(quizz.name));
      }
    });

    it("Check bad quizz name", async () => {
      jest.spyOn(quizzEntity, "getQuizzByName").mockImplementation(() => null);
      const quizz: CreateQuizzDTO = {
        name: "...dsqdsq????",
        description: "Lasagne",
        start_date: new Date("2022-03-08T00:00:00.000Z"),
        end_date: new Date("2022-03-09T00:00:00.000Z"),
        questions: question
      };

      try {
        await quizzService.createQuizz(quizz);
      }
      catch (err) {
        expect(err).toEqual(new BadQuizzName(quizz.name));
      }
    });

    it("Check question is not empty", async () => {
      jest.spyOn(quizzEntity, "getQuizzByName").mockImplementation(() => null);
      let quest: CreateQuestionsDTO[] = question.copyWithin(question.length, 0);

      quest[0].question = "";

      const quizz: CreateQuizzDTO = {
        name: "Quizz sur les lasagnes",
        description: "Lasagne",
        start_date: new Date("2022-03-08T00:00:00.000Z"),
        end_date: new Date("2022-03-09T00:00:00.000Z"),
        questions: quest
      };

      try {
        await quizzService.createQuizz(quizz);
      } catch (err) {
        expect(err).toEqual(new EmptyQuestion());
      }
    });

    it("Check response is not empty", async () => {
      console.log(question);
      jest.spyOn(quizzEntity, "getQuizzByName").mockImplementation(() => null);
      let quest: CreateQuestionsDTO[] = question.copyWithin(question.length, 0);

      quest[0].responses[0].response = "";

      const quizz: CreateQuizzDTO = {
        name: "Quizz sur les lasagnes",
        description: "Lasagne",
        start_date: new Date("2022-03-08T00:00:00.000Z"),
        end_date: new Date("2022-03-09T00:00:00.000Z"),
        questions: quest
      };

      try {
        await quizzService.createQuizz(quizz);
      }
      catch (err) {
        expect(err).toEqual(new ResponseIsEmptyException());
      }
    });

    it("Create questions with multiple respones choice", async () => {
      jest.spyOn(quizzEntity, "getQuizzByName").mockImplementation(() => null);
      jest.spyOn(quizzEntity, "createQuizz").mockImplementation(() => null);

      let quest: CreateQuestionsDTO[] = question.copyWithin(question.length, null);

      quest[0].responses[0].good_response = true;
      quest[0].responses[1].good_response = true;

      const quizz: CreateQuizzDTO = {
        name: "Quizz sur les lasagnes",
        description: "Lasagne",
        start_date: new Date("2022-03-08T00:00:00.000Z"),
        end_date: new Date("2022-03-09T00:00:00.000Z"),
        questions: quest
      };

      await quizzService.createQuizz(quizz);
    });

    it("Check the number of response", async () => {
      jest.spyOn(quizzEntity, "getQuizzByName").mockImplementation(() => null);
      let quest: CreateQuestionsDTO[] = question.copyWithin(question.length, null);

      quest[0].responses.pop();

      const quizz: CreateQuizzDTO = {
        name: "Quizz sur les lasagnes",
        description: "Lasagne",
        start_date: new Date("2022-03-08T00:00:00.000Z"),
        end_date: new Date("2022-03-09T00:00:00.000Z"),
        questions: quest
      }

      try {
        await quizzService.createQuizz(quizz);
      }
      catch (err) {
        expect(err).toEqual(new NumberOfResponseException(quest[0].responses.length, 4));
      }
    });

    it("Check start date is upper than end_date", async () => {
      jest.spyOn(quizzEntity, "getQuizzByName").mockImplementation(() => null);

      const quizz: CreateQuizzDTO = {
        name: "Quizz sur les lasagnes",
        description: "Lasagne",
        start_date: new Date("2022-03-08T00:00:00.000Z"),
        end_date: new Date("2022-03-07T00:00:00.000Z"),
        questions: question
      };

      try {
        await quizzService.createQuizz(quizz)
      } catch (err) {
        expect(err).toEqual(new QuizDateException());
      }
    })
  });
});
