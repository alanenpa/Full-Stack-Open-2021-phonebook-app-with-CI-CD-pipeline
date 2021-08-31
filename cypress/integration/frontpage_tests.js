describe('Phonebook', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3005/api/persons/reset')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3005')
    cy.contains('Phonebook')
    cy.contains('add a new entry')
    cy.contains('Numbers')
  })

  it('a new person can be added', function() {
    cy.visit('http://localhost:3005')
    cy.get('#nameInput').type('Test Person')
    cy.get('#numberInput').type('0123456789')
    cy.get('#submit').click()

    cy.get('.notification').contains('Added Test Person')
    cy.contains('Test Person 0123456789')
    cy.wait(5100)
  })
})

describe('Phonebook with entries', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3005/api/persons/reset')
    const entry1 = {
      name: 'Asimov',
      number: '0123456789'
    }
    cy.request('POST', 'http://localhost:3005/api/persons', entry1)
    const entry2 = {
      name: 'Vonnegut',
      number: '0011224455'
    }
    cy.request('POST', 'http://localhost:3005/api/persons', entry2)
    const entry3 = {
      name: 'Huxley',
      number: '0101010101'
    }
    cy.request('POST', 'http://localhost:3005/api/persons', entry3)
    cy.visit('http://localhost:3005')
    cy.wait(1000) 
  })

  it('filtering works', function() {
    cy.get('#filter').type('asim')
    cy.contains('Vonnegut').should('not.exist')
    cy.contains('Huxley').should('not.exist')
    cy.contains('Asimov')
  })

  it('deletion works', function() {
    cy.visit('http://localhost:3005')
    cy.contains('Vonnegut').children().click()
    cy.get('.notification').contains('Deleted Vonnegut')
    cy.wait(5100)    
    cy.contains('Vonnegut').should('not.exist')
  })
})
