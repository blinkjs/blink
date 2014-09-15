﻿import sinonChai = require('../../sinon-chai');
var expect = sinonChai.expect;
import blink = require('../../../lib/browser/blink');
import Formatter = require('../../../lib/Formatter');


var config = blink.config;
var newline = config.newline;

// ReSharper disable WrongExpressionStatement
describe('Formatter', () => {

	var f: Formatter;
	before(() => {
		f = new Formatter();
	});

	it('properly formats a rule with one declaration', () => {
		var css = f.format(config, [
			[['.foo'], [
				['bar', 'BAR']
			]]
		]);
		expect(css).to.eq([
			'.foo {',
			'  bar: BAR;',
			'}'
		].join(newline) + newline);
	});

	it('properly formats a rule with two declarations', () => {
		var css = f.format(config, [
			[['.foo'], [
				['bar', 'BAR'],
				['baz', 'BAZ']
			]]
		]);
		expect(css).to.eq([
			'.foo {',
			'  bar: BAR;',
			'  baz: BAZ;',
			'}'
		].join(newline) + newline);
	});

	it('properly formats two rules', () => {
		var css = f.format(config, [
			[['.foo'], [
				['bar', 'BAR']
			]],
			[['.baz'], [
				['qux', 'QUX']
			]]
		]);
		expect(css).to.eq([
			'.foo {',
			'  bar: BAR;',
			'}',
			'.baz {',
			'  qux: QUX;',
			'}'
		].join(newline) + newline);
	});

	it('properly formats a nested at-rule with two inner rules', () => {
		var css = f.format(config, [
			[['@foo'], [
				[['.bar'], [
					['baz', 'BAZ']
				]],
				[['.qux'], [
					['quux', 'QUUX']
				]]
			]]
		]);
		expect(css).to.eq([
			'@foo {',
			'  .bar {',
			'    baz: BAZ;',
			'  }',
			'  .qux {',
			'    quux: QUUX;',
			'  }',
			'}'
		].join(newline) + newline);
	});

	it('properly formats a deeply-nested at-rule', () => {
		var css = f.format(config, [
			[['@foo'], [
				[['@bar'], [
					[['.baz'], [
						['qux', 'QUX'],
						['quux', 'QUUX']
					]]
				]]
			]]
		]);
		expect(css).to.eq([
			'@foo {',
			'  @bar {',
			'    .baz {',
			'      qux: QUX;',
			'      quux: QUUX;',
			'    }',
			'  }',
			'}'
		].join(newline) + newline);
	});

});
