import { QuizzDTO } from '@app/common';
import { Quizz } from '@prisma/client';
import QuizzAlreadyExist from '../../LogicExceptions/Quizz/quizzAlreadyExist';
import { CreateQuizzDTO } from '../quizz.dto';
import QuizzEntity from '../quizz.entity';
import IComponent from './IComponent';

export default class ExistQuizzComponent implements IComponent {
  next: IComponent;
  readonly quizzRepository: QuizzEntity;

  constructor(quizzRepository: QuizzEntity) {
    this.quizzRepository = quizzRepository;
  }

  public async Execute(quizz: CreateQuizzDTO | QuizzDTO): Promise<void> {
    let result: Quizz | null = await this.quizzRepository.getQuizzByName(quizz.name);
    if (result != null) {
      throw new QuizzAlreadyExist(quizz.name);
    }

    if (this.next != null)
      await this.next.Execute(quizz);
  }
}
