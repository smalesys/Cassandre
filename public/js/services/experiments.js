/*
 * Copyright (C) 2016 Simon Malesys - Institut Pasteur
 *
 * This file is part of Cassandre
 *
 * Cassandre is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Cassandre is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

// ============================================================================
// ============================================================================

/*
 *  Angular service to share the list of experiments between every part
 *  of the application.
 *
 */

angular.module("cassandre").factory("experiments", ["expHttp", function (expHttp) {

    var exps = {
        all: [],                 // All the experiments found in datasets
        selected: [],            // All the experiments selected in the side menu lists
        sideMenu: {}             // The selected lists of experiments in the aside section
    };

    return {
        list: {
            all: function () {
                return exps;
            }
        },
        select: {
            one: function (list, exp) {
                exps.selected.push(exp);
                exps.sideMenu[list].selected.push(exp);
            }
        },
        deselect: {
            one: function (list, exp) {
                exps.selected.splice(exps.selected.indexOf(exp), 1);
                exps.sideMenu[list].selected.splice(exps.sideMenu[list].selected.indexOf(exp), 1);
            }
        },
        remove: {
            list: function (list) {
                exps.sideMenu[list].selected.forEach(function (exp) {
                    if (exps.selected.indexOf(exp) > -1) {
                        exps.selected.splice(exps.selected.indexOf(exp), 1);
                    }
                });

                delete exps.sideMenu[list];
            }
        },
        reset: {
            all: function () {
                exps.all = [];
            },
            selected: function () {
                exps.selected = [];
            }
        },
        get: {
            all: function () {
                expHttp.get(function (expList) {
                    exps.all = expList;
                });
            },
            selected: function (sets) {
                expHttp.get({ sets: sets }, function (expList) {
                    exps.all = expList;
                });
            }
        }
    };
}]);
