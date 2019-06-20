import { TestBed, inject } from '@angular/core/testing'

import { FormbuilderService } from './formbuilder.service'

describe('FormbuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormbuilderService]
    })
  })

  it('should be created', inject([FormbuilderService], (service: FormbuilderService) => {
    expect(service).toBeTruthy()
  }))
})
