describe("Pizza App", ()=>{
    it("Can visit website", ()=> {
                cy.visit('http://localhost:3000/pizza')
            })

    it("can add text", ()=>{
        cy.get('#name').type("whatever")
        .should('have.value', "whatever")
        cy.get('#instructions').type("whatever")
        .should('have.value', "whatever")
    })

    it("can check boxes", ()=>{
        cy.get('div > :nth-child(1) > input').click()
        .should('have.value', "on")
        cy.get('div > :nth-child(2) > input').click()
        .should('have.value', "on")
        cy.get('div > :nth-child(3) > input').click()
        .should('have.value', "on")
        cy.get('div > :nth-child(4) > input').click()
        .should('have.value', "on")
    })

    it("can submit", ()=>{
        cy.get('button').click()
    })
})
