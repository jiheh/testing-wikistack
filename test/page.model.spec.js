var chai = require('chai');
var expect = chai.expect;
var models = require('../models');
var Page = models.Page;
var User = models.User;


describe('Page model', function () {
  beforeEach(function(done) {
    User.sync({force: true})
    .then(function() {
      return Page.sync({force: true})
    })
    .then(function() {
      done();
    })
    .catch(done);
  });

	describe('Virtuals', function () {
    var testPage;

    beforeEach(function() {
      testPage = Page.build({
        urlTitle: 'Test_Title',
        content: 'Content'
      });
    });

    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function() {
        expect(testPage.route).to.equal('/wiki/Test_Title');
      });
    });

    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function() {

      });
      // expect(testPage.route).to.equal('/wiki/Test');
    });
  });


  xdescribe('Class methods', function () {
    describe('findByTag', function () {
      it('gets pages with the search tag', function() {

      });
      it('does not get pages without the search tag', function() {

      });
    });
  });

  xdescribe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself', function() {

      });
      it('gets other pages with any common tags', function() {

      });
      it('does not get other pages without any common tags', function() {

      });
    });
  });

  xdescribe('Validations', function () {
    it('errors without title', function() {

    });
    it('errors without content', function() {

    });
    it('errors given an invalid status', function() {

    });
  });

  xdescribe('Hooks', function () {
    it('it sets urlTitle based on title before validating', function() {

    });
  });

});