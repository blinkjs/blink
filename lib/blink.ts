﻿import _Block = require('./Block');
import _BlockBody = require('./interfaces/BlockBody');
import _Compiler = require('./Compiler');
import _ConfigurationOptions = require('./interfaces/ConfigurationOptions');
import _Element = require('./Element');
import _ElementBody = require('./interfaces/ElementBody');
import _Extender = require('./interfaces/Extender');
import _MediaAtRule = require('./MediaAtRule');
import _Modifier = require('./Modifier');
import _ModifierBody = require('./interfaces/ModifierBody');
import _Override = require('./interfaces/Override');
import _Rule = require('./Rule');
import _RuleBody = require('./interfaces/RuleBody');
import Configuration = require('./Configuration');


module Blink {

	export var config = new Configuration();

	export function compile(options?: ConfigurationOptions):
		NodeJS.ReadWriteStream {
		var tempConfig = config.clone().set(options || {});
		var compiler = new Compiler(tempConfig);
		return compiler.compile();
	}

	export class Compiler    extends _Compiler {}
	export class Rule        extends _Rule {}
	export class Block       extends _Block {}
	export class Element     extends _Element {}
	export class MediaAtRule extends _MediaAtRule {}
	export class Modifier    extends _Modifier {}

	export interface ConfigurationOptions extends _ConfigurationOptions {}
	export interface BlockBody            extends _BlockBody {}
	export interface ElementBody          extends _ElementBody {}
	export interface Extender             extends _Extender {}
	export interface ModifierBody         extends _ModifierBody {}
	export interface Override             extends _Override {}
	export interface RuleBody             extends _RuleBody {}

}

export = Blink;
