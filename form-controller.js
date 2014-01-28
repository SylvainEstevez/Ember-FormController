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
 * Fields definitions "format" property maybe set to "true"
 * By calling "formatFields" method, format function will be applied to field's value
 * For example, an hexa color value entered as "2572EB" will be formatted as "#2572EB"
 *
 * @INFO
 * Both "validateFields" & "formatFields" methods can be called with or without arguments
 * - no arguments, if you wish all fields to be treated
 * - an array of fields, to select the fields you want tht method to be called on
 * - a list of fields, which will be treated as the array
 *
 * @INFO
 * A "defaults" property may be passed as a parameter.
 * In this case, all fields definitions will be extended with these defaults properties
 * It can be particularly useful if, for example, all the fields in your form are "required"
 *
 */
(function() {
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
      value = value.latinise();
      value = value.replace(/ /g, '_');
      value = value.replace(/\W/gi, '');
      return value.toLowerCase();
    }
  });

  /**
   * NAMESPACE
   */
  Ember.Formatters = Ember.Namespace.create({
    init: function() {
      this._buildInstances();
    },

    Blank: Formatter,
    String: StringFormatter,
    UpperCase: UpperCaseFormatter,
    LowerCase: LowerCaseFormatter,
    Integer: IntegerFormatter,
    Float: FloatFormatter,
    HexColor: HexColorFormatter,
    UrlChars: UrlCharsFormatter,

    format: function(formatter, value) {
      formatter = this._instances[formatter.classify()] || this._instances.Blank;
      return formatter.format(value);
    },

    register: function(name, formatter) {
      name = name.classify();
      if(this[name]) throw new Error('You cannot override formatters, please choose another name than "' + name + '"');
      if(!formatter) throw new Error('New formatter must at least implement a "format" method');
      this[name] = formatter;
      this._buildInstances();
    },

    _buildInstances: function() {
      this._instances = {};
      for(var key in this) {
        try {
          var test = this[key].create();
          if(test instanceof Formatter) this._instances[key] = test;
        } catch(ex) { continue; }
      }
    }
  });

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
      return !isNaN( (new Date(value)).getTime() );
    }
  });
  /**
   * UrlChars validator
   */
  var UrlCharsValidator = Validator.extend({
    validate: function(value) {
      return !(/\W/gi.test(value));
    }
  });


  /**
   * NAMESPACE
   */
  Ember.Validators = Ember.Namespace.create({
    init: function() {
      this._buildInstances();
    },

    Blank: Validator,
    Integer: IntegerValidator,
    Float: FloatValidator,
    String: StringValidator,
    Date: DateValidator,
    RegExp: RegExpValidator,
    Hexadecimal: RegExpValidator.extend({
      regex: /^[0-9A-F]+$/
    }),
    Email: RegExpValidator.extend({
      regex: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    }),
    Phone: RegExpValidator.extend({
      regex: /^\+?(?:[0-9] ?){6,14}[0-9]$/
    }),
    Url: RegExpValidator.extend({
      regex: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    }),
    HexColor: RegExpValidator.extend({
      regex: /^#([a-f0-9]{6}|[a-f0-9]{3})$/
    }),
    UrlChars: UrlCharsValidator,

    validate: function(validator, value) {
      validator = this._instances[validator.classify()] || this._instances.Blank;
      return validator.validate(value);
    },

    register: function(name, validator) {
      name = name.classify();
      if(this[name]) throw new Error('You cannot override validators, please choose another name than "' + name + '"');
      if(!validator) throw new Error('New validator must at least implement a "validate" method');
      this[name] = validator;
      this._buildInstances();
    },

    _buildInstances: function() {
      this._instances = {};
      for(var key in this) {
        try {
          var test = this[key].create();
          if(test instanceof Validator) this._instances[key] = test;
        } catch(ex) { continue; }
      }
    }
  });


  /*********************************************************************************************************************
   * FORM CONTROLLER
   ********************************************************************************************************************/
  Ember.FormController = Ember.Controller.extend({
    /**
     * Properties
     */
    fields: {},
    onFieldsUpdated: function() { this._formatParameters(); }.observes('fields.@each'),
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
      this._formatParameters();
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

        if(field.type && (field.required || field.value)) field.valid = Ember.Validators.validate(field.type, field.value);
        if(field.required && this.NULL_VALUES.indexOf(field.value) >= 0) field.missing = true;
        if(field.notNull && !field.value) field.missing = true;
        if(field.match && (field.value !== this.get('source.' + field.match))) field.mismatch = true;
        if(field.hasOwnProperty('equal') && (field.value !== field.equal)) field.mismatch = true;

        var error = this.ErrorObj.create({});
        if(field.missing) error.set('missing', true);
        if(!field.missing && !field.valid) error.set('invalid', true);
        if(!field.required && !field.value && !field.valid) error.set('invalid', false);
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
    _formatParameters: function() {
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
