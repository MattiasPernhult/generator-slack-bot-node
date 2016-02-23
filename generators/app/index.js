'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var exec = require('child_process').exec;

module.exports = yeoman.generators.Base.extend({
  //Configurations will be loaded here.
  prompting: function() {
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: 'slackbot'
    }, function(answers) {
      // access it in the logic layer
      this.props = answers;
      this.log(answers.name);
      done();
    }.bind(this));
  },
  // logic layer here
  writing: {
    //Copy the configuration files
    config: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath(this.props.name + '/package.json'), {
          name: this.props.name
        }
      );

      // this.fs.copyTpl(
      //   this.templatePath('_bower.json'),
      //   this.destinationPath('bower.json'), {
      //     name: this.props.name
      //   }
      // );
    },

    folders: function() {
      this.mkdir(this.props.name);
    },

    //Copy application files
    app: function() {
      this.fs.copy(
        this.templatePath('_bin/_bot.js'),
        this.destinationPath(this.props.name + '/bin/bot.js')
      );

      this.fs.copy(
        this.templatePath('_lib/_slackbot.js'),
        this.destinationPath(this.props.name + '/lib/slackbot.js')
      );

      this.fs.copy(
        this.templatePath('_.gitignore'),
        this.destinationPath(this.props.name + '/.gitignore')
      );
    },
    //Install Dependencies
    install: function() {
      var self = this;
      console.log(this.destinationPath(this.props.name));
      process.chdir(this.destinationPath(this.props.name));
      this.npmInstall();
    },
  },
});
