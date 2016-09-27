var chai = require('chai');
var expect = chai.expect;
var models = require('../models');
var Page = models.Page;
var User = models.User;
var marked = require('marked');
chai.should();
chai.use(require('chai-things'));

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
        expect(testPage.renderedContent).to.equal(marked(testPage.content));
      });
    });
  });


  describe('Class methods', function () {
    var testPage;
    beforeEach(function(done){
      Page.create({
        title: 'test title',
        content: 'test content',
        tags: ['tag1', 'tag2', 'tag3']
      })
      .then(function(page){ 
        testPage = page;
        done();
      });
    });

    describe('findByTag', function () {
      it('gets pages with the search tag', function(done) {
        var result;

        Page.findByTag('tag1')
        .then(function (pages) {
          result = pages;
          expect(result[0].title).to.equal(testPage.title);
          done();
        })
        .catch(done);
      });

      it('does not get pages without the search tag', function(done) {
        Page.findByTag('tag4')
        .then(function (pages) {
          var result = pages;
          expect(result.length).to.equal(0);
          done();
        })
        .catch(done);
      });
    });
  });

  describe('Instance methods', function () {
    var testPage1, testPage2, testPage3;

    beforeEach(function(done) {
      Page.create({
        title: 'Page 1',
        content: 'test content',
        tags: ['tag1', 'tag2']
      })
      .then(function(page) {
        testPage1 = page;
      });

      Page.create({
        title: 'Page 2',
        content: 'test content',
        tags: ['tag2', 'tag3']
      })
      .then(function(page) {
        testPage2 = page;
      });

      Page.create({
        title: 'Page 3',
        content: 'test content',
        tags: ['tag4']
      })
      .then(function(page) {
        testPage3 = page;
        done();
      });

    });

    describe('findSimilar', function () {
      it('never gets itself', function(done) {
        testPage1.findSimilar()
        .then(function (pages) {
          var result = pages.map(page => page.title);

          expect(result.should.not.include('Page 1'));
          done();
        })
        .catch(done);
      });

      it('gets other pages with any common tags', function(done) {
        testPage1.findSimilar()
        .then(function (pages) {
          var result = pages.map(page => page.title);

          expect(result.should.include.something.that.deep.equals('Page 2'));
          done();
        })
        .catch(done);
      });

      it('does not get other pages without any common tags', function(done) {
        testPage1.findSimilar()
        .then(function (pages) {
          var result = pages.map(page => page.title);

          expect(result.should.not.include('Page 3'));
          done();
        })
        .catch(done);
      });

    });
  });

  describe('Validations', function () {
    var testPage;


    // beforeEach(function() {
    //   testPage = Page.build({
    //         status: 'skittle'
    //       });
    //     });

    it('errors without title', function(done) {
      var testPage = Page.build({
            content: 'skittle',
            status: 'open'
          });
      
      testPage.validate().then(function(errors){
          expect(errors.errors[0].path).to.equal('title');
          done();
      })
      
    });
    it('errors without content', function(done) {
      var testPage = Page.build({
            title: 'skittle',
            urlTitle: 'skittle',
            status: 'open'
          });
      
      testPage.validate().then(function(errors){
          expect(errors.errors[0].path).to.equal('content');
          done();
      })

    });
    it('errors given an invalid status', function() {
      var testPage = Page.build({
            title: 'skittle',
            urlTitle: 'skittle',
            content: 'cereal',
            status: 'ahh'
          });
      
      expect(['open', 'closed'].includes(testPage.status)).to.equal(false);

      });
  });

  xdescribe('Hooks', function () {
    it('it sets urlTitle based on title before validating', function() {

    });
  });

});