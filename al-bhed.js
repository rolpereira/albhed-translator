function albhedTranslateCtrl($scope) {
    // Auxiliary function that return a function that translates
    // the characters of "from" to the ones in "to
    //
    // This function is analogous to "maketrans" in Python
    $scope.makeTranslate = function(from, to) {
        var translationDict = [];

        // Each charactor of "from" needs to map to a character in "to"
        if (from.length !== to.length) {
            return undefined;
        }

        for (var i = 0; i !== from.length; i++) {
            translationDict[from[i]] = to[i];
        }

        return function(string) {
            var returnValue = "";

            for (var k = 0; k !== string.length; k++) {
                if (translationDict[string[k]]) {
                    returnValue += translationDict[string[k]];
                }
                else {
                    returnValue += string[k];
                }
            }

            return returnValue;
        };
    };

    $scope.translateEnglishToAlbhed = $scope.makeTranslate("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
                                                           "epstiwknuvgclrybxhmdofzqajEPSTIWKNUVGCLRYBXHMDOFZQAJ");

    $scope.translateAlbhedToEnglish = $scope.makeTranslate("epstiwknuvgclrybxhmdofzqajEPSTIWKNUVGCLRYBXHMDOFZQAJ",
                                                           "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

    // Initialize the strings
    $scope.english = "";  // Text currently in the "english" textarea
    $scope.albhed = "";   // Text currently in the "al-bhed" textarea

    // Watches for updating each
    $scope.$watch('english', function(string) {
        // Update "al-bhed" textarea
        $scope.albhed = $scope.translateEnglishToAlbhed(string);
    });

    $scope.$watch('albhed', function(v) {
        // Update "english" textarea
        $scope.english = $scope.translateAlbhedToEnglish(v);
    });
}
