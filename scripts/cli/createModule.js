const prompts = require('prompts')
const fs = require('fs')
const path = require('path')
const config = require('../config')
const { copySync, writeFileSync } = require('fs-extra')
const { render } = require('ejs')

const cwd = process.cwd()

const questions = [
    {
      type: 'text',
      name: 'name',
      message: '模块名称？',
      validate: value => (Boolean(value) && !fs.existsSync(path.resolve(cwd, config.modulesPath, value)))
        ? true
        : '模块已存在，请换个名字'
    }
];

prompts(questions)
    .then(res => {
        copySync(
            path.resolve(cwd, config.moduleTemplatePath),
            path.resolve(cwd, config.modulesPath, res.name)
        )
        writeFileSync(path.resolve(cwd, config.entrysPath, res.name + '.js'), render(
            fs.readFileSync(
                path.resolve(cwd, config.templatePath, config.entryTemplatePath)
            ),
            {
                name: res.name
            }
        ))
    })