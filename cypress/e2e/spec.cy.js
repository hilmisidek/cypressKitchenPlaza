/// <reference types="cypress" />

describe('Kitchen Plaza', () => {
  
                                      
  
  it('check url', () => {
    cy.visit('https://kitchenplaza.com.my')
    cy.title().should('include','Kitchen')
   
  })
  it('register error', () => {
    cy.wait(1000)
    cy.get('.et_b_header-account > .flex > .flex-inline > .et-element-label').click()
    cy.wait(1000)
    cy.fixture('example').then((signInData)=>{
      signInData.forEach (data => {
                
        cy.get('#reg_email').type(data.email)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-error > li').then(function(e){
        //method text to obtain text content
        const t = e.text()
        expect(t).to.contains(data.message)
        cy.get('#reg_email').clear()
      })
    })
   })
  })

  it('login fail', () => {
    cy.wait(1000)
    cy.get('.et_b_header-account > .flex > .flex-inline > .et-element-label').click()
    cy.wait(1000)
    cy.fixture('login').then((loginData)=>{
      loginData.forEach (Data => {
        if (Data.email_login==""){
          cy.get('#username').clear()
        }
        else{cy.get('#username').type(Data.email_login)}
        if (Data.password_login==""){
          cy.get('#password').clear()
        }
        else {
        cy.get('#password').type(Data.password_login)}
        cy.get('.m0 > .woocommerce-button').click()
        cy.get('.woocommerce-error > li').then(function(e){
        //method text to obtain text content
        const t = e.text()
        expect(t).to.contains(Data.message_login)
        cy.get('#username').clear()
        cy.get('#password').clear()
      })
    })
   })
  })

  it('login success', () => {
    cy.wait(1000)
    cy.get('.et_b_header-account > .flex > .flex-inline > .et-element-label').click()
    cy.wait(1000)
    cy.fixture('loginpass').then((loginPass)=>{
      loginPass.forEach (Data => {
        if (cy.get('#username').should('be.empty')==false){
          cy.get('#username').clear()
        }
        else{cy.get('#username').type(Data.email_login)}
        if (cy.get('#password').should('be.empty')==false){
          cy.get('#password').clear()
        }
        else {
        cy.get('#password').type(Data.password_login)}
        cy.get('.m0 > .woocommerce-button').click()
        cy.get('.MyAccount-user-info > :nth-child(2) > :nth-child(2)').then(function(e){
        //method text to obtain text content
        const t = e.text()
        expect(t).to.contains(Data.email_login)
       
      })
    })
   })
  })


})