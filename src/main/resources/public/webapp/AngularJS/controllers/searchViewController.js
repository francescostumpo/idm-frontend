snamApp.controller("searchViewController", ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location,$rootScope) { 
    console.log("[INFO] Hello World from searchViewController"); 

    $scope.baseEndpoint = "file:///Users/guidorocco/Documents/Other_Projects/Snam/IDM/test-frontend"; 

    $scope.testVariable = "Test"; 

    type = ['primary', 'info', 'success', 'warning', 'danger'];

    $scope.showModifyGaraModal = false; 
    $scope.showDeleteGaraModal = false; 

    $scope.listCards = [
        {
            "cig": "5100001260",
            "societa": "Acme Inc.",
            "oggetto": "Fornitura di componenti hardware",
            "lavorazione": "03/07/2020",
            "fornitori": "12"
        }, 
        {
            "cig": "5100001259",
            "societa": "Stogit",
            "oggetto": "Fornitura di tubi senza saldatura",
            "lavorazione": "03/06/2020",
            "fornitori": "15"
        },
        {
            "cig": "5100001263",
            "societa": "G. House Medicals",
            "oggetto": "Fornitura di materiali di primo soccorso",
            "lavorazione": "03/06/2020",
            "fornitori": "8"
        },
        {
            "cig": "5100001262",
            "societa": "Frostfire Electronics",
            "oggetto": "Fornitura di componenti elettronici",
            "lavorazione": "03/06/2020",
            "fornitori": "18"
        }, 
        {
            "cig": "5100001265",
            "societa": "Stark Inc.",
            "oggetto": "Fornitura di materiali di sicurezza",
            "lavorazione": "18/10/2020",
            "fornitori": "11"
        },
        {
            "cig": "5100001261",
            "societa": "Wiza and Sons",
            "oggetto": "Fornitura di telecamere di sicurezza",
            "lavorazione": "25/12/2020",
            "fornitori": "15"
        },
        {
            "cig": "5100001266",
            "societa": "Stark Inc.",
            "oggetto": "Fornitura di materiali di sicurezza",
            "lavorazione": "18/10/2020",
            "fornitori": "11"
        },
        {
            "cig": "5100001267",
            "societa": "Stark Inc.",
            "oggetto": "Fornitura di materiali di sicurezza",
            "lavorazione": "18/10/2020",
            "fornitori": "11"
        },
        {
            "cig": "5100001268",
            "societa": "Stark Inc.",
            "oggetto": "Fornitura di materiali di sicurezza",
            "lavorazione": "18/10/2020",
            "fornitori": "11"
        },
        {
            "cig": "5100001269",
            "societa": "Stark Inc.",
            "oggetto": "Fornitura di materiali di sicurezza",
            "lavorazione": "18/10/2020",
            "fornitori": "11"
        },
        {
            "cig": "5100001270",
            "societa": "Stark Inc.",
            "oggetto": "Fornitura di materiali di sicurezza",
            "lavorazione": "18/10/2020",
            "fornitori": "11"
        },
        {
            "cig": "5100001271",
            "societa": "Stark Inc.",
            "oggetto": "Fornitura di materiali di sicurezza",
            "lavorazione": "18/10/2020",
            "fornitori": "11"
        }
    ]


    // L'ordine iniziale delle righe 
    $scope.orderArrows = {
        "cig": "none",
        "oggetto": "none",
        "societa": "none",
        "lavorazione": "none",
        "fornitori": "none"
    }

    $scope.selectedBandoGara = []; 

    $scope.listLength = $scope.listCards.length;  

    console.log('length of list: ', $scope.listLength); 


    $scope.showNotification = function(from, align, message, color, icon, type) {

        let notificationMessage; 

    
        switch(type) {

            case 'modifygara': 
               notificationMessage = "Modifica effettuata con successo!"; 
               break; 

            case 'deletegara': 
               notificationMessage = "Bando di gara eliminato con successo!"; 
               break; 

            default: 
               notificationMessage = "Modifica effettuata con successo!"; 
               break; 
        } 


        $.notify({
            icon: icon,
            message: message

        }, {
            type: type[color],
            timer: 10,
            placement: {
                from: from,
                align: align
            }, 
            animate: {
				enter: 'animated fadeInDown',
				exit: 'animated fadeOutUp'
            },
            allow_dismiss: true, 
           template: `
           <div data-notify="container" class="col-xs-11 col-sm-4 alert alert-info alert-with-icon animated fadeInDown" role="alert" data-notify-position="top-right" style="display: inline-block; margin: 0px auto; position: fixed; transition: all 0.5s ease-in-out 0s; z-index: 1060; top: 20px; right: 20px;">
           <button type="button" aria-hidden="true" class="close" data-notify="dismiss" style="position: absolute; right: 10px; top: 50%; margin-top: -13px; z-index: 1062;">
           <i class="tim-icons icon-simple-remove"></i></button><span data-notify="icon" class="icon-check-2">
           </span> 
           <span data-notify="title"></span> 
             <span data-notify="message">${notificationMessage}</span><a href="#" target="_blank" data-notify="url">
             </a>
            </div>
            `
            , 
            css: `
              background: #DCF4F2;
              border: 1px solid #CFD6DB;
              box-shadow: 2px 2px 5px 0 rgba(136,136,136,0.50);
              border-radius: 8px;
              border-radius: 8px;
              `
        });
    }


    document.getElementById("modal-modify-gara").style.display = "block"; 
    document.getElementById("modal-delete-gara").style.display = "block"; 
    document.getElementById("modify-and-delete-button-div").style.display = "block"; 
    document.getElementById("cigHeaderCheckBox").checked = false; 

    $scope.selectBandoGara = function (cig) {
        let itemToToggle = document.getElementById("bando-gara-" + cig);
        itemToToggle.classList.toggle("item-list-selected");
        if($scope.selectedBandoGara.includes(cig)) {
            let filteredArray = $scope.selectedBandoGara.filter((value, index, arr) => {return value !== cig});
            $scope.selectedBandoGara = filteredArray;
            console.log("$scope.selectedBandoGara is now: ", $scope.selectedBandoGara);
        }
        else {
            $scope.selectedBandoGara.push(cig);
            console.log("$scope.selectedBandoGara is now: ", $scope.selectedBandoGara);
        }
        console.log('selected cig is: ', cig);
    } 

    $scope.toggleDropdownMenu = function (cig) {

        // Disables all dropdown menus 
        let dropdownMenusAsHtmlElement = document.getElementsByClassName("dropdown-menu"); 
        let dropdownMenus = Array.prototype.slice.call(dropdownMenusAsHtmlElement);
        // $scope.selectedBandoGara = []; 

        console.log("dropdown menus: ", dropdownMenus); 
        dropdownMenus.forEach((item) => { 
            console.log("item in dropdownMenus: ", item); 
            if(item.cig !== cig) { 
                item.classList.remove("show");
            }
        }); 

        let dropdown = document.getElementById("dropdown-menu-" + cig);
        console.log("dropdown is: ", dropdown);
        dropdown.classList.toggle("show"); 
        console.log("after toggleDropdownMenu, $scope.selectedBandoGara is: ", $scope.selectedBandoGara); 
    }

    $scope.checkIfSelectedBandoGara = function () {
        console.log('checkIfSel called, value: ', $scope.selectedBandoGara.length > 0 ? true : false);
        console.log('Actual length is: ', $scope.selectedBandoGara.length);
        return $scope.selectedBandoGara.length > 0 ? true : false;
    } 

    $scope.checkLengthSelectedBandoGara = function () {
        console.log("Length in $scope.checkLengthSelectedBandoGara is: ", $scope.selectedBandoGara.length); 
        return $scope.selectedBandoGara.length <= 1; 
    }

    $scope.toggleModalModifyGara = function (cig){ 
        console.log('"toggleModalModifyGara called');  

    /*    if(!$scope.showDeleteGaraModal) {
            $scope.selectedBandoGara.push(cig); 
        } 

        $scope.selectedBandoGara.filter((item) => item !== cig); */ 

        $scope.showModifyGaraModal = !$scope.showModifyGaraModal;
        console.log('new value of $scope.showModifyGaraModal is: ', $scope.showModifyGaraModal);
    } 

    $scope.toggleModalDeleteGara = function (cig, fromModalCancel) {
        console.log('"toggleModalDeleteGara called');


        // Set the current row as the selected item
        if(!$scope.showDeleteGaraModal) {
            $scope.selectedBandoGara.push(cig);
        }
        console.log('fromModalCancel: ', fromModalCancel); 
        $scope.selectedBandoGara.filter((item) => item !== cig);
        if(fromModalCancel == 'true') {
            console.log("fromModalCancel true!");
            $scope.selectedBandoGara = []; 
            $scope.selectAllCheckBoxes(); 
        }
        console.log("in toggleModalDeleteGara, $scope.selectedBandoGara is: ", $scope.selectedBandoGara);
        $scope.showDeleteGaraModal = !$scope.showDeleteGaraModal;
        console.log('new value of $scope.showDeleteGaraModal is: ', $scope.showDeleteGaraModal);
    } 

    $scope.modifyGara = function () {
        $scope.toggleModalModifyGara();

    /*    let cig = $scope.selectedBandoGara[0]; 
        let newCig = document.getElementById("modal-update-cig").value; 
        console.log("cig is: ", cig); 
        console.log('"newCig is: ', newCig); 

        $scope.listCards = $scope.modifyGaraFromListaGare(cig, newCig) */ 
        $scope.showNotification('top','right',"Modifica effettuata con successo!",1,"icon-check-2","modifygara");
        // setTimeout(() => { location = location}, 3000); 
    } 

    $scope.deleteGara = function (elem) {
        console.log("deleteGara called");
        $scope.toggleModalDeleteGara();
        $scope.listCards = $scope.listCards.filter(item => !$scope.selectedBandoGara.includes(item["cig"]));
        console.log("$scope.listCards is now: ", $scope.listCards);
        $scope.selectedBandoGara = [];
        $scope.showNotification('top', 'right', "Bando di gara eliminato con successo!", 1, "icon-check-2", "deletegara");
        // setTimeout(() => { location = location}, 3000);
    } 


    $scope.modifyGaraFromListaGare = function (cig,newCig) {
        for (var i=0;i<$scope.listCards.length;i++) {
          if ($scope.listCards[i].cig === cig) {
            $scope.listCards[i].cig = newCig;
          }
        }
        return $scope.listCards;
      }

    $scope.toggleDownAllHeaderCheckboxes = function(checkbox) {
            for (let item in $scope.orderArrows) {
                console.log('for ok');
                if(item!==checkbox) {
                    let iconToToggle = document.getElementById("arrow-icon-"+item);
                    iconToToggle.classList.remove("fa-sort-asc");
                    iconToToggle.classList.add("fa-sort-desc");
                    iconToToggle.style.marginTop = "0.5%";
                    $scope.orderArrows[item] = "desc";
                }
            }
    }

    $scope.sortCardsByColumnName = function (column) {
        console.log("$scope.sortCardsByColumnName called, column ", column);
        // Disables all the icons previously toggled
        $scope.toggleDownAllHeaderCheckboxes(column);
        let iconToToggle = document.getElementById("arrow-icon-" + column);
        if($scope.orderArrows[column] == "asc") {
            iconToToggle.classList.remove("fa-sort-asc");
            iconToToggle.classList.add("fa-sort-desc");
            iconToToggle.style.marginTop = "0.5%";
            $scope.orderArrows[column] = "desc";
        }
        else {
            iconToToggle.classList.remove("fa-sort-desc");
            iconToToggle.classList.add("fa-sort-asc");
            iconToToggle.style.marginTop = (column == "cig" || column == "oggetto") ? "2%": "3%";
            $scope.orderArrows[column] = "asc";
        }
        // Order the cards according to the sorting criteria
        $scope.listCards = $scope.listCards.sort((a, b) => {
            console.log("a.column: ", a[column]);
            console.log("b.column: ", b[column]);
            if(column == "cig" || column == "fornitori") {
                return $scope.orderArrows[column] == 'desc' ?  a[column] - b[column] :  b[column] - a[column];
            }
            else if (column=="lavorazione") {
                return $scope.orderArrows[column] == 'desc' ?  new Date(a[column]) - new Date(b[column]) :  new Date(b[column]) -  new Date(a[column]);
            }
            else {
                return $scope.orderArrows[column] == 'desc' ?  a[column].localeCompare(b[column], 'it') : b[column].localeCompare(a[column], 'it');
            }
        });
    }

    $scope.selectAllCheckBoxes = function () {
        let checkBoxesAsHtmlElement = document.getElementsByClassName("form-check-input");
        let checkBoxes = Array.prototype.slice.call(checkBoxesAsHtmlElement);
        console.log("checkboxes: ", checkBoxes);
        console.log("first element checked: ", checkBoxes[0].checked);
        // Esegue se ho appena de-checkato la checkbox (che quindi ora è in stato checked = false)
        if(checkBoxes[0].checked === false) {
            checkBoxes.forEach((elem) => {
                console.log("elem: ", elem);
                elem.checked = false;
                if(elem.id === "cigHeaderCheckBox") {}
                else {
                    console.log("elem: ", elem);
                    let elemCig = elem.id.split('-')[3];
                    console.log("elem.id is: ", elem.id);
                    console.log("elem cig is: ", elemCig);
                    let itemToToggle = document.getElementById("bando-gara-" + elemCig);
                    itemToToggle.classList.remove("item-list-selected");
                    $scope.selectedBandoGara = [];
                }
            });
        }
        // Esegue se ho appena checkato la checkbox (che è quindi ora in stato checked = true)
        else {
            // De-checka eventuali checkbox già preventivamente selezionate prima di cliccare 
            // sulla checkbox del Table Header 
            checkBoxes.forEach((elem) => {
                if(elem.id === "cigHeaderCheckBox") {}
                else {
                    console.log("elem prev: ", elem);
                    let elemCig = elem.id.split('-')[3];
                    let itemToToggle = document.getElementById("bando-gara-" + elemCig);
                    itemToToggle.classList.remove("item-list-selected");
                }
            });
            // Effettua quindi il check di tutte le checkbox e dei rispettivi elementi
            let activeCheckboxArray = [];
            $scope.selectedBandoGara = [];
            checkBoxes.forEach((elem) => {
                if(elem.id === "cigHeaderCheckBox") {}
                else {
                    console.log("elem: ", elem);
                    elem.checked = true;
                    let elemCig = elem.id.split('-')[3];
                    console.log("elem.id is: ", elem.id);
                    console.log("elem cig is: ", elemCig);
                    $scope.selectedBandoGara.push(elemCig);
                    let itemToToggle = document.getElementById("bando-gara-" + elemCig);
                    itemToToggle.classList.toggle("item-list-selected");
                }
            });
        }
    }
}]);