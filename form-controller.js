/*********************************************************************************************************************
 * FORM CONTROLLER
 *********************************************************************************************************************
 *
 * @USAGE
 * Used to easily perform forms validation
 * You must call "validateFields" method in order to perform the validation
 * Each time you call this function, "errors" is populated
 * If no errors are present, "errors" is a null value
 *
 * @DEPENDENCIES Underscore.js or Lodash.js (recommended)
 *
 * @INFO
 * Parameter "fields" must me formatted like the following
 *
 * name: {
   *   first: { type: 'String' }
   *   last: { type: 'String' }
   * },
 * email: { type: 'Email', required: true },
 * color: { type: 'HexColor', format: 'HexColor' }
 *
 * @INFO
 * Fields definitions "format" property maybe set
 * By calling "formatFields" method, format function will be applied to field's value
 * For example, an hexa color value entered as "2572EB" will be formatted as "#2572EB"
 * Another example : a float value entered as "25,72" will be formatted as "25.72"
 *
 * @INFO
 * Both "validateFields" & "formatFields" methods can be called with or without arguments
 * - no arguments, if you wish all fields to be treated
 * - an array of fields, to select the fields you want the method to be called on
 * - a list of fields, which will be treated as the array
 *
 * @INFO
 * A "defaults" property may be passed as a parameter.
 * In this case, all fields definitions will be extended with these defaults properties
 * It can be particularly useful if, for example, all the fields in your form are "required"
 *
 */
(function() {
  // Add "latinize" helper to String prototype
  var Latinise = {};
  Latinise.latin_map = {"Á":"A","Ă":"A","Ắ":"A","Ặ":"A","Ằ":"A","Ẳ":"A","Ẵ":"A","Ǎ":"A","Â":"A","Ấ":"A","Ậ":"A","Ầ":"A","Ẩ":"A","Ẫ":"A","Ä":"A","Ǟ":"A","Ȧ":"A","Ǡ":"A","Ạ":"A","Ȁ":"A","À":"A","Ả":"A","Ȃ":"A","Ā":"A","Ą":"A","Å":"A","Ǻ":"A","Ḁ":"A","Ⱥ":"A","Ã":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ḃ":"B","Ḅ":"B","Ɓ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ć":"C","Č":"C","Ç":"C","Ḉ":"C","Ĉ":"C","Ċ":"C","Ƈ":"C","Ȼ":"C","Ď":"D","Ḑ":"D","Ḓ":"D","Ḋ":"D","Ḍ":"D","Ɗ":"D","Ḏ":"D","ǲ":"D","ǅ":"D","Đ":"D","Ƌ":"D","Ǳ":"DZ","Ǆ":"DZ","É":"E","Ĕ":"E","Ě":"E","Ȩ":"E","Ḝ":"E","Ê":"E","Ế":"E","Ệ":"E","Ề":"E","Ể":"E","Ễ":"E","Ḙ":"E","Ë":"E","Ė":"E","Ẹ":"E","Ȅ":"E","È":"E","Ẻ":"E","Ȇ":"E","Ē":"E","Ḗ":"E","Ḕ":"E","Ę":"E","Ɇ":"E","Ẽ":"E","Ḛ":"E","Ꝫ":"ET","Ḟ":"F","Ƒ":"F","Ǵ":"G","Ğ":"G","Ǧ":"G","Ģ":"G","Ĝ":"G","Ġ":"G","Ɠ":"G","Ḡ":"G","Ǥ":"G","Ḫ":"H","Ȟ":"H","Ḩ":"H","Ĥ":"H","Ⱨ":"H","Ḧ":"H","Ḣ":"H","Ḥ":"H","Ħ":"H","Í":"I","Ĭ":"I","Ǐ":"I","Î":"I","Ï":"I","Ḯ":"I","İ":"I","Ị":"I","Ȉ":"I","Ì":"I","Ỉ":"I","Ȋ":"I","Ī":"I","Į":"I","Ɨ":"I","Ĩ":"I","Ḭ":"I","Ꝺ":"D","Ꝼ":"F","Ᵹ":"G","Ꞃ":"R","Ꞅ":"S","Ꞇ":"T","Ꝭ":"IS","Ĵ":"J","Ɉ":"J","Ḱ":"K","Ǩ":"K","Ķ":"K","Ⱪ":"K","Ꝃ":"K","Ḳ":"K","Ƙ":"K","Ḵ":"K","Ꝁ":"K","Ꝅ":"K","Ĺ":"L","Ƚ":"L","Ľ":"L","Ļ":"L","Ḽ":"L","Ḷ":"L","Ḹ":"L","Ⱡ":"L","Ꝉ":"L","Ḻ":"L","Ŀ":"L","Ɫ":"L","ǈ":"L","Ł":"L","Ǉ":"LJ","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ń":"N","Ň":"N","Ņ":"N","Ṋ":"N","Ṅ":"N","Ṇ":"N","Ǹ":"N","Ɲ":"N","Ṉ":"N","Ƞ":"N","ǋ":"N","Ñ":"N","Ǌ":"NJ","Ó":"O","Ŏ":"O","Ǒ":"O","Ô":"O","Ố":"O","Ộ":"O","Ồ":"O","Ổ":"O","Ỗ":"O","Ö":"O","Ȫ":"O","Ȯ":"O","Ȱ":"O","Ọ":"O","Ő":"O","Ȍ":"O","Ò":"O","Ỏ":"O","Ơ":"O","Ớ":"O","Ợ":"O","Ờ":"O","Ở":"O","Ỡ":"O","Ȏ":"O","Ꝋ":"O","Ꝍ":"O","Ō":"O","Ṓ":"O","Ṑ":"O","Ɵ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Õ":"O","Ṍ":"O","Ṏ":"O","Ȭ":"O","Ƣ":"OI","Ꝏ":"OO","Ɛ":"E","Ɔ":"O","Ȣ":"OU","Ṕ":"P","Ṗ":"P","Ꝓ":"P","Ƥ":"P","Ꝕ":"P","Ᵽ":"P","Ꝑ":"P","Ꝙ":"Q","Ꝗ":"Q","Ŕ":"R","Ř":"R","Ŗ":"R","Ṙ":"R","Ṛ":"R","Ṝ":"R","Ȑ":"R","Ȓ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꜿ":"C","Ǝ":"E","Ś":"S","Ṥ":"S","Š":"S","Ṧ":"S","Ş":"S","Ŝ":"S","Ș":"S","Ṡ":"S","Ṣ":"S","Ṩ":"S","ẞ":"SS","Ť":"T","Ţ":"T","Ṱ":"T","Ț":"T","Ⱦ":"T","Ṫ":"T","Ṭ":"T","Ƭ":"T","Ṯ":"T","Ʈ":"T","Ŧ":"T","Ɐ":"A","Ꞁ":"L","Ɯ":"M","Ʌ":"V","Ꜩ":"TZ","Ú":"U","Ŭ":"U","Ǔ":"U","Û":"U","Ṷ":"U","Ü":"U","Ǘ":"U","Ǚ":"U","Ǜ":"U","Ǖ":"U","Ṳ":"U","Ụ":"U","Ű":"U","Ȕ":"U","Ù":"U","Ủ":"U","Ư":"U","Ứ":"U","Ự":"U","Ừ":"U","Ử":"U","Ữ":"U","Ȗ":"U","Ū":"U","Ṻ":"U","Ų":"U","Ů":"U","Ũ":"U","Ṹ":"U","Ṵ":"U","Ꝟ":"V","Ṿ":"V","Ʋ":"V","Ṽ":"V","Ꝡ":"VY","Ẃ":"W","Ŵ":"W","Ẅ":"W","Ẇ":"W","Ẉ":"W","Ẁ":"W","Ⱳ":"W","Ẍ":"X","Ẋ":"X","Ý":"Y","Ŷ":"Y","Ÿ":"Y","Ẏ":"Y","Ỵ":"Y","Ỳ":"Y","Ƴ":"Y","Ỷ":"Y","Ỿ":"Y","Ȳ":"Y","Ɏ":"Y","Ỹ":"Y","Ź":"Z","Ž":"Z","Ẑ":"Z","Ⱬ":"Z","Ż":"Z","Ẓ":"Z","Ȥ":"Z","Ẕ":"Z","Ƶ":"Z","Ĳ":"IJ","Œ":"OE","ᴀ":"A","ᴁ":"AE","ʙ":"B","ᴃ":"B","ᴄ":"C","ᴅ":"D","ᴇ":"E","ꜰ":"F","ɢ":"G","ʛ":"G","ʜ":"H","ɪ":"I","ʁ":"R","ᴊ":"J","ᴋ":"K","ʟ":"L","ᴌ":"L","ᴍ":"M","ɴ":"N","ᴏ":"O","ɶ":"OE","ᴐ":"O","ᴕ":"OU","ᴘ":"P","ʀ":"R","ᴎ":"N","ᴙ":"R","ꜱ":"S","ᴛ":"T","ⱻ":"E","ᴚ":"R","ᴜ":"U","ᴠ":"V","ᴡ":"W","ʏ":"Y","ᴢ":"Z","á":"a","ă":"a","ắ":"a","ặ":"a","ằ":"a","ẳ":"a","ẵ":"a","ǎ":"a","â":"a","ấ":"a","ậ":"a","ầ":"a","ẩ":"a","ẫ":"a","ä":"a","ǟ":"a","ȧ":"a","ǡ":"a","ạ":"a","ȁ":"a","à":"a","ả":"a","ȃ":"a","ā":"a","ą":"a","ᶏ":"a","ẚ":"a","å":"a","ǻ":"a","ḁ":"a","ⱥ":"a","ã":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ḃ":"b","ḅ":"b","ɓ":"b","ḇ":"b","ᵬ":"b","ᶀ":"b","ƀ":"b","ƃ":"b","ɵ":"o","ć":"c","č":"c","ç":"c","ḉ":"c","ĉ":"c","ɕ":"c","ċ":"c","ƈ":"c","ȼ":"c","ď":"d","ḑ":"d","ḓ":"d","ȡ":"d","ḋ":"d","ḍ":"d","ɗ":"d","ᶑ":"d","ḏ":"d","ᵭ":"d","ᶁ":"d","đ":"d","ɖ":"d","ƌ":"d","ı":"i","ȷ":"j","ɟ":"j","ʄ":"j","ǳ":"dz","ǆ":"dz","é":"e","ĕ":"e","ě":"e","ȩ":"e","ḝ":"e","ê":"e","ế":"e","ệ":"e","ề":"e","ể":"e","ễ":"e","ḙ":"e","ë":"e","ė":"e","ẹ":"e","ȅ":"e","è":"e","ẻ":"e","ȇ":"e","ē":"e","ḗ":"e","ḕ":"e","ⱸ":"e","ę":"e","ᶒ":"e","ɇ":"e","ẽ":"e","ḛ":"e","ꝫ":"et","ḟ":"f","ƒ":"f","ᵮ":"f","ᶂ":"f","ǵ":"g","ğ":"g","ǧ":"g","ģ":"g","ĝ":"g","ġ":"g","ɠ":"g","ḡ":"g","ᶃ":"g","ǥ":"g","ḫ":"h","ȟ":"h","ḩ":"h","ĥ":"h","ⱨ":"h","ḧ":"h","ḣ":"h","ḥ":"h","ɦ":"h","ẖ":"h","ħ":"h","ƕ":"hv","í":"i","ĭ":"i","ǐ":"i","î":"i","ï":"i","ḯ":"i","ị":"i","ȉ":"i","ì":"i","ỉ":"i","ȋ":"i","ī":"i","į":"i","ᶖ":"i","ɨ":"i","ĩ":"i","ḭ":"i","ꝺ":"d","ꝼ":"f","ᵹ":"g","ꞃ":"r","ꞅ":"s","ꞇ":"t","ꝭ":"is","ǰ":"j","ĵ":"j","ʝ":"j","ɉ":"j","ḱ":"k","ǩ":"k","ķ":"k","ⱪ":"k","ꝃ":"k","ḳ":"k","ƙ":"k","ḵ":"k","ᶄ":"k","ꝁ":"k","ꝅ":"k","ĺ":"l","ƚ":"l","ɬ":"l","ľ":"l","ļ":"l","ḽ":"l","ȴ":"l","ḷ":"l","ḹ":"l","ⱡ":"l","ꝉ":"l","ḻ":"l","ŀ":"l","ɫ":"l","ᶅ":"l","ɭ":"l","ł":"l","ǉ":"lj","ſ":"s","ẜ":"s","ẛ":"s","ẝ":"s","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ᵯ":"m","ᶆ":"m","ń":"n","ň":"n","ņ":"n","ṋ":"n","ȵ":"n","ṅ":"n","ṇ":"n","ǹ":"n","ɲ":"n","ṉ":"n","ƞ":"n","ᵰ":"n","ᶇ":"n","ɳ":"n","ñ":"n","ǌ":"nj","ó":"o","ŏ":"o","ǒ":"o","ô":"o","ố":"o","ộ":"o","ồ":"o","ổ":"o","ỗ":"o","ö":"o","ȫ":"o","ȯ":"o","ȱ":"o","ọ":"o","ő":"o","ȍ":"o","ò":"o","ỏ":"o","ơ":"o","ớ":"o","ợ":"o","ờ":"o","ở":"o","ỡ":"o","ȏ":"o","ꝋ":"o","ꝍ":"o","ⱺ":"o","ō":"o","ṓ":"o","ṑ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","õ":"o","ṍ":"o","ṏ":"o","ȭ":"o","ƣ":"oi","ꝏ":"oo","ɛ":"e","ᶓ":"e","ɔ":"o","ᶗ":"o","ȣ":"ou","ṕ":"p","ṗ":"p","ꝓ":"p","ƥ":"p","ᵱ":"p","ᶈ":"p","ꝕ":"p","ᵽ":"p","ꝑ":"p","ꝙ":"q","ʠ":"q","ɋ":"q","ꝗ":"q","ŕ":"r","ř":"r","ŗ":"r","ṙ":"r","ṛ":"r","ṝ":"r","ȑ":"r","ɾ":"r","ᵳ":"r","ȓ":"r","ṟ":"r","ɼ":"r","ᵲ":"r","ᶉ":"r","ɍ":"r","ɽ":"r","ↄ":"c","ꜿ":"c","ɘ":"e","ɿ":"r","ś":"s","ṥ":"s","š":"s","ṧ":"s","ş":"s","ŝ":"s","ș":"s","ṡ":"s","ṣ":"s","ṩ":"s","ʂ":"s","ᵴ":"s","ᶊ":"s","ȿ":"s","ɡ":"g","ß":"ss","ᴑ":"o","ᴓ":"o","ᴝ":"u","ť":"t","ţ":"t","ṱ":"t","ț":"t","ȶ":"t","ẗ":"t","ⱦ":"t","ṫ":"t","ṭ":"t","ƭ":"t","ṯ":"t","ᵵ":"t","ƫ":"t","ʈ":"t","ŧ":"t","ᵺ":"th","ɐ":"a","ᴂ":"ae","ǝ":"e","ᵷ":"g","ɥ":"h","ʮ":"h","ʯ":"h","ᴉ":"i","ʞ":"k","ꞁ":"l","ɯ":"m","ɰ":"m","ᴔ":"oe","ɹ":"r","ɻ":"r","ɺ":"r","ⱹ":"r","ʇ":"t","ʌ":"v","ʍ":"w","ʎ":"y","ꜩ":"tz","ú":"u","ŭ":"u","ǔ":"u","û":"u","ṷ":"u","ü":"u","ǘ":"u","ǚ":"u","ǜ":"u","ǖ":"u","ṳ":"u","ụ":"u","ű":"u","ȕ":"u","ù":"u","ủ":"u","ư":"u","ứ":"u","ự":"u","ừ":"u","ử":"u","ữ":"u","ȗ":"u","ū":"u","ṻ":"u","ų":"u","ᶙ":"u","ů":"u","ũ":"u","ṹ":"u","ṵ":"u","ᵫ":"ue","ꝸ":"um","ⱴ":"v","ꝟ":"v","ṿ":"v","ʋ":"v","ᶌ":"v","ⱱ":"v","ṽ":"v","ꝡ":"vy","ẃ":"w","ŵ":"w","ẅ":"w","ẇ":"w","ẉ":"w","ẁ":"w","ⱳ":"w","ẘ":"w","ẍ":"x","ẋ":"x","ᶍ":"x","ý":"y","ŷ":"y","ÿ":"y","ẏ":"y","ỵ":"y","ỳ":"y","ƴ":"y","ỷ":"y","ỿ":"y","ȳ":"y","ẙ":"y","ɏ":"y","ỹ":"y","ź":"z","ž":"z","ẑ":"z","ʑ":"z","ⱬ":"z","ż":"z","ẓ":"z","ȥ":"z","ẕ":"z","ᵶ":"z","ᶎ":"z","ʐ":"z","ƶ":"z","ɀ":"z","ﬀ":"ff","ﬃ":"ffi","ﬄ":"ffl","ﬁ":"fi","ﬂ":"fl","ĳ":"ij","œ":"oe","ﬆ":"st","ₐ":"a","ₑ":"e","ᵢ":"i","ⱼ":"j","ₒ":"o","ᵣ":"r","ᵤ":"u","ᵥ":"v","ₓ":"x"};
  String.prototype.latinise=function(){return this.replace(/[^A-Za-z0-9\[\] ]/g,function(a){return Latinise.latin_map[a]||a;});};
  String.prototype.latinize=String.prototype.latinise;
  String.prototype.isLatin=function(){return this==this.latinise();};

  /*********************************************************************************************************************
   * FORMATTERS
   ********************************************************************************************************************/

  var Formatter = Ember.Object.extend({
    format: function(value) {
      return value;
    }
  });
  var StringFormatter = Formatter.extend({
    format: function(value) {
      return value + '';
    }
  });
  var UpperCaseFormatter = StringFormatter.extend({
    format: function(value) {
      return value ? this._super(value).toUpperCase() : value;
    }
  });
  var LowerCaseFormatter = StringFormatter.extend({
    format: function(value) {
      return value ? this._super(value).toLowerCase() : value;
    }
  });
  var IntegerFormatter = Formatter.extend({
    format: function(value) {
      if(!value) return 0;
      var parsed = parseInt(value, 10);
      return !isNaN(parsed) ? parsed : value;
    }
  });
  var FloatFormatter = Formatter.extend({
    format: function(value) {
      if(!value) return 0;
      var parsed = parseFloat(value.toString().replace(',', '.'));
      return !isNaN(parsed) ? parsed : value;
    }
  });
  var HexColorFormatter = Formatter.extend({
    format: function(value) {
      if(!value) return '';
      if(/^#/.test(value)) return value;
      return Ember.Validators.Hexadecimal.validate(value.toUpperCase()) ? '#' + value : value;
    }
  });
  var UrlCharsFormatter = Formatter.extend({
    format: function(value) {
      if('string' !== Ember.typeOf(value)) return value;
      return value.latinise().replace(/ /g, '_').replace(/\W/gi, '').replace(/_/g, '-').toLowerCase();
    }
  });

  /**
   * NAMESPACE
   */
  Ember.Formatters = {
    Blank: Formatter.create({}),

    String: StringFormatter.create({}),
    UpperCase: UpperCaseFormatter.create({}),
    LowerCase: LowerCaseFormatter.create({}),
    Integer: IntegerFormatter.create({}),
    Float: FloatFormatter.create({}),

    HexColor: HexColorFormatter.create({}),

    UrlChars: UrlCharsFormatter.create({}),

    format: function(formatter, value) {
      formatter = Ember.Formatters[formatter.classify()] || Ember.Formatters.Blank;
      return formatter.format(value);
    },

    register: function(name, definition) {
      if(!definition || 'function' !== Ember.typeOf(definition.format))
        throw new Error('New formatter must at least implement a "format" method');
      Ember.Formatters[name.classify()] = Formatter.create(definition);
    }
  };

  /*********************************************************************************************************************
   * VALIDATORS
   ********************************************************************************************************************/

  /**
   * Blank validator, always returns true
   */
  var Validator = Ember.Object.extend({
    validate: function() {
      return true;
    }
  });
  /**
   * Integer validator
   */
  var IntegerValidator = Validator.extend({
    validate: function(value) {
      return parseFloat(value) % 1 === 0;
    }
  });
  /**
   * Float validator
   */
  var FloatValidator = Validator.extend({
    validate: function(value) {
      return !isNaN(parseFloat(value));
    }
  });
  /**
   * String validator
   */
  var StringValidator = Validator.extend({
    validate: function(value) {
      return 'string' === typeof value;
    }
  });
  /**
   * RegExp validator
   */
  var RegExpValidator = StringValidator.extend({
    validate: function(value) {
      if(!this._super(value)) return false;
      if(!this.regex) throw new Error('Validator must contain a "regex" property');
      return this.regex.test(value);
    }
  });

 /**
   * Date validator
   */
  var DateValidator = Validator.extend({
    validate: function(value) {
      return !isNaN( (new Date(value)).getTime());
    }
  });

  /**
   * NAMESPACE
   */
  Ember.Validators = {
    Blank: Validator.create({}),

    Integer: IntegerValidator.create({}),
    Float: FloatValidator.create({}),
    String: StringValidator.create({}),
    Date: DateValidator.create({}),

    Hexadecimal: RegExpValidator.create({
      regex: /^[0-9A-F]+$/
    }),

    Email: RegExpValidator.create({
      regex: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    }),
    Phone: RegExpValidator.create({
      regex: /^\+?(?:[0-9] ?){6,14}[0-9]$/
    }),
    Url: RegExpValidator.create({
      regex: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    }),

    HexColor: RegExpValidator.create({
      regex: /^#([a-f0-9]{6}|[a-f0-9]{3})$/
    }),

    validate: function(validator, value) {
      validator = Ember.Validators[validator.classify()] || Ember.Validators.Blank;
      return validator.validate(value);
    },

    register: function(name, definition) {
      if(!definition || 'function' !== Ember.typeOf(definition.validate))
        throw new Error('New validator must at least implement a "validate" method');
      Ember.Validators[name.classify()] = Validator.create(definition);
    }
  };


  /*********************************************************************************************************************
   * FORM CONTROLLER
   ********************************************************************************************************************/
  Ember.FormController = Ember.Controller.extend({
    /**
     * Properties
     */
    fields: {},
    onFieldsUpdated: function() { this._formatFields(); }.observes('fields.@each'),
    defaults: {},
    errors: null,
    ErrorObj: Ember.Object.extend(Ember.I18n.TranslateableProperties, {}),

    // Make a difference between "does not exist" & "is falsy"
    NULL_VALUES: ['', null, undefined],


    /**
     * Initialization
     */
    init: function() {
      this.set('source', this.get('source') || this);
      this._formatFields();
    },


    /**
     * Validate method
     *
     * Iterates over all fields and performs validity checks
     */
    validateFields: function() {
      var fields = this._getFields(arguments),
          errors = [];
      for(var key in fields) {
        var field = fields[key];
        field.value = this.get('source.' + key);
        field.valid = true;
        field.missing = false;
        field.mismatch = false;

        if(field.type) field.valid = Ember.Validators.validate(field.type, field.value);
        if(field.required && this.NULL_VALUES.indexOf(field.value) >= 0) field.missing = true;
        if(field.notNull && !field.value) field.missing = true;
        if(field.match && (field.value !== this.get('source.' + field.match))) field.mismatch = true;
        if(field.hasOwnProperty('equal') && (field.value !== field.equal)) field.mismatch = true;

        var error = this.ErrorObj.create({});
        if(field.missing) error.set('missing', true);
        if(!field.missing && !field.valid) error.set('invalid', true);
        if(field.mismatch) {
          error.set('invalid', true);
          error.set('mismatch', true);
        }
        if(Ember.keys(error).length) {
          error.set('key', key);
          errors.push(error);
        }
      }

      errors = errors.length ? errors : null;
      this.set('errors', errors);
      return !errors;
    },

    /**
     * Format method
     *
     * Iterates over all fields and format values if needed
     */
    formatFields: function() {
      var fields = this._getFields(arguments);
      for(var key in fields) {
        var field = fields[key];
        if(field.format) {
          var value = Ember.Formatters.format(field.format, this.get('source.' + key));
          this.set('source.' + key, value);
          field.value = value;
        }
      }
    },


    /**
     * Get list af fields to treat depending on arguments
     */
    _getFields: function(args) {
      args = Ember.makeArray(args);
      switch (args.length) {
        case 0:
          return this._fields;
        case 1:
          if(!Ember.isArray(args[0])) args[0] = [args[0]];
          return _.pick(this._fields, args[0]);
        default:
          return _.pick(this._fields, args);
      }
    },
    /**
     * Flatten and format "fields" parameter in order to simplify further treatments
     */
    _formatFields: function() {
      // Simplify treatments by flattening "fields" object
      var fields = this._flatten(Ember.copy(this.fields, true));
      // Format each field and add default properties
      for(var key in fields) {
        var field = fields[key];
        fields[key] = _.extend($.isPlainObject(field) ? field : {value: field}, this.defaults);
      }
      this._fields = fields;
    },
    /**
     * Flatten whole object except last level
     */
    _flatten: function(obj) {
      var ret = {};
      for(var key in obj) {
        if(!obj.hasOwnProperty(key)) continue; // Only enumerables
        var value = obj[key];
        if ('object' === Ember.typeOf(value) && this._containsObj(value)) {
          var flatObject = this._flatten(value);
          for(var sub in flatObject) {
            if (!flatObject.hasOwnProperty(sub)) continue;
            ret[key + '.' + sub] = flatObject[sub];
          }
        } else {
          ret[key] = obj[key];
        }
      }
      return ret;
    },
    /**
     * Check if an object contains an object
     */
    _containsObj: function(obj) {
      for(var key in obj) {
        if(!obj.hasOwnProperty(key)) continue; // Only enumerables
        if('object' === Ember.typeOf(obj[key])) return true;
      }
      return false;
    }
  });

})();
