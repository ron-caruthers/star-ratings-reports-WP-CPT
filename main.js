/* ========================================================================
 * DOM-based Routing
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {

        // Drop down selector
        $('.btn-group .btn').on('click', function(e) {
          // _gaq.push(['_trackEvent', 'Home Page Click', 'Drop down open', 'Drop down open']);
          console.log('button clicked');
        });
        $('.btn-group.open .btn').on('click', function(e) {
          // _gaq.push(['_trackEvent', 'Home Page Click', 'Drop down open', 'Drop down open']);
          console.log('open button clicked');
        });

        $('#dynamic_select').on('change', function (e) {
            var url = $(this).val();
            if (url) {
                window.location = url;
            }

        });

        $('a.icon-list--link').on('click', function(e) {
          clicked_icon = $(this).find('p.icon-list--icon-title').text();
          _gaq.push(['_trackEvent', 'Home Page Click', 'Icon select', clicked_icon]);
        });

      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    },

    'category_income_protection_insurance': {
      init: function() {

        // init Slick
        $('.slick_selector').slick({
          speed: 500,
          infinite: false,
          draggable: false,
          swipe: false,
          nextArrow: false,
          prevArrow: '.slickPrevArrow',
          adaptiveHeight: true
        });
      },

      finalize: function() {

        var clicked;

        $('.advised_selector a').on('click', function(e) {

          _gaq.push(['_trackEvent', 'Income Protection Sliding Selector', 'Icon select', 'Advised']);
          // Advised selector code snippet
          canstar_widget.category_selector.show_title = true;
          canstar_widget.category_selector.title_text = 'Advised Income Protection';
          canstar_widget.faceted_search.table = 'advisedlife';
          canstar_widget.faceted_search.category = 'Advised Income Protection Insurance';
          canstar_widget.category_selector.preselect = [{ name: "profile", value: "Income Protection" }];
          new canstar_widget.category_selector.CategorySelectorView({el: '#selector_container'});

          setTimeout(slideAndShowArrow, 250);
          clicked = 'Advised';

          e.preventDefault();
        });

        $('.direct_selector a').on('click', function(e) {

          _gaq.push(['_trackEvent', 'Income Protection Sliding Selector', 'Icon select', 'Direct']);
          // Direct selector code snippet
          canstar_widget.category_selector.show_title = true;
          canstar_widget.category_selector.title_text = 'Direct Income Protection';
          canstar_widget.faceted_search.table = 'directincome';
          canstar_widget.faceted_search.category = 'Direct Income Protection Insurance';
          canstar_widget.category_selector.preselect = [{ name: "profile", value: "INCP" }];
          new canstar_widget.category_selector.CategorySelectorView({el: '#selector_container'});

          setTimeout(slideAndShowArrow, 250);
          clicked = 'Direct';

          e.preventDefault();
        });

        $('.slickPrevArrow').on('click', function() {

          _gaq.push(['_trackEvent', 'Income Protection Sliding Selector', 'Back button', clicked]);
          // hide Prev arrow until user chooses selector
          $('.slickPrevArrow').removeClass('showArrow');
        });

        // slide and show back arrow
        var slideAndShowArrow = function() {
          $('.slick_selector').slick('slickGoTo', 1);
          $('.slickPrevArrow').addClass('showArrow');
        };

      }
    },

    'category_home_loans': {
      init: function() {

        // Amount field placeholder logic
        amt_selector = $('form input[name="amount"]');

        // make it lighter only if its the default value
        // this is for when the user arrives on this page
        // after hitting the Back button from a compare page
        if ( amt_selector.val() !== 'Enter amount') {
          amt_selector.css('color', '#727272');
        } else {
          amt_selector.css('color', '#cccccc');
        }

        // Remove default value on focus
        amt_selector.on('focus', function(e) {
          if( this.value === this.defaultValue ) {
            this.value = '';
            $(this).css('color', '#727272');
          }
        // Switch back to default value on blur if user
        // hasn't entered anything
        }).on('blur', function(e) {
          if( this.value === '' ) {
            this.value = this.defaultValue;
            $(this).css('color', '#cccccc');
          }
        });

      },

      finalize: function() {

        $('#container_selector form').on('submit', function(e) {

          // variables
          url_root = 'http://www.canstar.com.au/compare';
          var url_branch;

          amt_selector_valid = false;
          purpose_selector_valid = false;
          state_selector_valid = false;

          amt_selector = $('form input[name="amount"]');
          purpose_selector = $('form select[name="profile"]');
          state_selector = $('form select[name="state"]');

          loan_amount = amt_selector.val().replace(',', '');
          loan_purpose = purpose_selector.val();
          loan_state = state_selector.val();

          // validation
          var invalid_fields = [];

          // only accept 5-digit numbers that don't begin with a 0 -- i.e. >= 10000
          if ( !loan_amount.match(/[1-9][0-9]{4,}/g) ) {
            amt_selector.addClass('required-field');
            // add to ga tracking array
            invalid_fields.push('Loan Amount='+loan_amount);
            e.preventDefault();
          } else {
            amt_selector.removeClass('required-field');
            amt_selector_valid = true;
          }
          if (loan_purpose === '0') {
            purpose_selector.addClass('required-field');
            // add to ga tracking array
            invalid_fields.push('Loan Purpose');
            e.preventDefault();
          } else {
            purpose_selector.removeClass('required-field');
            purpose_selector_valid = true;
          }
          if (loan_state === '0') {
            state_selector.addClass('required-field');
            // add to ga tracking array
            invalid_fields.push('Loan State');
            e.preventDefault();
          } else {
            state_selector.removeClass('required-field');
            state_selector_valid = true;
          }

          // if all three fields validate...
          if ( amt_selector_valid && purpose_selector_valid && state_selector_valid ) {

            // ga tracking build array
            var valid_fields = [];
            var loan_type = [];
            valid_fields.push(loan_amount, loan_purpose, loan_state, loan_type);

            // remove required-field class
            amt_selector.removeClass('required-field');
            purpose_selector.removeClass('required-field');
            state_selector.removeClass('required-field');

            // build url root+branch according to loan purpose field value
            if (loan_purpose === 'Buying+Next+Home') { url_branch = '/home-loans/'; }
            if (loan_purpose === 'Refinance') { url_branch = '/home-loans/'; }
            if (loan_purpose === 'Line+of+Credit') { url_branch = '/line-of-credit-home-loan/'; }
            if (loan_purpose === 'First+Home+Buyer') { url_branch = '/first-home-buyer-home-loans/'; }
            if (loan_purpose === 'Investing') { url_branch = '/investor-home-loans/'; }
            if (loan_purpose === 'Building') { url_branch = '/construction-home-loans/'; }

            // build query string
            url_amount = '?amount=' + loan_amount;
            url_profile = '&profile=' + loan_purpose;
            url_state = '&state=' + loan_state;

            // build an array of all checked interest types
            interest_variable = $('form input:checkbox:checked').map(function(){
              // add checked interest types to ga tracking array
              loan_type.push( $(this).val() );
              // build query string by prepending each item
              return '&Loan+Type[]=' + $(this).val();
            }).get();
            // remove the comma from the interest types query string array
            url_interest = interest_variable.join('');

            // ga event tracking
            // turn arrays into strings because ga doesn't like objects
            loan_type_string = loan_type.toString();
            valid_fields_string = valid_fields.toString();

            _gaq.push(['_trackEvent', 'Home Loans category selector', 'amount', loan_amount]);
            _gaq.push(['_trackEvent', 'Home Loans category selector', 'profile', loan_purpose]);
            _gaq.push(['_trackEvent', 'Home Loans category selector', 'state', loan_state]);
            _gaq.push(['_trackEvent', 'Home Loans category selector', 'Loan Type', loan_type_string]);
            _gaq.push(['_trackEvent', 'Home Loans category selector', 'combined_profile', valid_fields_string]);

            // assemble and submit the url and query string
            compare_url = url_root + url_branch + url_amount + url_profile + url_state + url_interest;
            window.location = encodeURI(compare_url);
            // don't add '&compare-button=' to query string
            e.preventDefault();

          } else {
            // ga event tracking
            // turn array into string because ga doesn't like objects
            invalid_fields_string = invalid_fields.toString();
            _gaq.push(['_trackEvent', 'Home Loans category selector', 'invalid_fields_profile', invalid_fields_string]);
          }

        });

      }

    },

    'single_star_ratings_report': {
      init: function() {

      },
      finalize: function() {

          elementHeights = $('.first-row .inner').map(function() {
            return $(this).height();
          }).get();
          maxHeight = Math.max.apply(null, elementHeights);
          $('.first-row .inner').height(maxHeight);

          elementHeights = $('.second-row .inner').map(function() {
            return $(this).height();
          }).get();
          maxHeight = Math.max.apply(null, elementHeights);
          $('.second-row .inner').height(maxHeight);

          elementHeights = $('.third-row .inner').map(function() {
            return $(this).height();
          }).get();
          maxHeight = Math.max.apply(null, elementHeights);
          $('.third-row .inner').height(maxHeight);

      }
    }
    
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
