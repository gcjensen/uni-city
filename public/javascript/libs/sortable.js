angular.module('psi.sortable', [])
  .value('psiSortableConfig', {
    placeholder: "placeholder",
    opacity: 0.8,
    axis: "y",
    helper: 'clone',
    forcePlaceholderSize: true
  })
  .directive("psiSortable", ['psiSortableConfig', '$log', function(psiSortableConfig, $log) {
    return {
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {

        if(!ngModel) {
          $log.error('psiSortable needs a ng-model attribute!', element);
          return;
        }

        var opts = {};
        angular.extend(opts, psiSortableConfig);
        opts.update = update;

        // listen for changes on psiSortable attribute
        scope.$watch(attrs.psiSortable, function(newVal) {
          angular.forEach(newVal, function(value, key) {
            element.sortable('option', key, value);
          });
        }, true);

        // store the sortable index
        scope.$watch(attrs.ngModel+'.length', function() {
          element.children().each(function(i, elem) {
            jQuery(elem).attr('sortable-index', i);
          });
        });

        // jQuery sortable update callback
        function update(event, ui) {
          // get model
          var model = ngModel.$modelValue;
          // remember its length
          var modelLength = model.length;
          // rember html nodes
          var items = [];

          // loop through items in new order
          element.children().each(function(index) {
            var item = jQuery(this);

            // get old item index
            var oldIndex = parseInt(item.attr("sortable-index"), 10);

            // add item to the end of model
            model.push(model[oldIndex]);

            if(item.attr("sortable-index")) {
              // items in original order to restore dom
              items[oldIndex] = item;
              // and remove item from dom
              item.detach();
            }
          });

          model.splice(0, modelLength);

          // restore original dom order, so angular does not get confused
          element.append.apply(element, items);

          // notify angular of the change
          scope.$digest();
        }

        element.sortable(opts);
      }
    };
  }]);
