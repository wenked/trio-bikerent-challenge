import { Candidate } from '@/usecases/datatypes/candidate';

export class CandidateBuilder {
  private candidate: Candidate = {
    email: 'john@doe.com',
    name: 'John Doe',
  };

  withToken(): CandidateBuilder {
    this.candidate.token = '123456';
    return this;
  }

  withId(id?: number): CandidateBuilder {
    if (!id) {
      this.candidate.id = 1;
      return this;
    }

    this.candidate.id = id;
    return this;
  }

  build(): Candidate {
    return this.candidate;
  }
}
