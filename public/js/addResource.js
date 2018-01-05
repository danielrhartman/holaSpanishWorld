$(document).ready(function() {
    $('#success').hide();
    var blockCount = 0;
    addBlock();

    // Event handling
    $('#addButton').on('click', function() {
        addBlock();   
    });
    $('#submitButton').on('click', function() {
        submitResource();
    });
    $('#resourceForm').on('submit', function() {
        submitResource();
        return false;
    });

    function addBlock(){
        $('#blocks').append(
            `   <div class="well">
            <div class="form-group"> 
                <label for="text` + blockCount + `">Text</label>
                <textarea id="text` + blockCount + `" class="form-control" form="resourceForm"></textarea>
            </div>
            </div>`
        );

        blockCount++;
    }

    submitResource = function(){
        console.log('submitResource');
        //console.log($('#text0').val());
        var fields = {
            created: new Date(),
            title: $('#title').val(),
            link: $('#link').val(),
            image: $('#image').val(),
            keywords: []
        };
        
        fields.keywords = $('#keywords').val().split(',');

        console.log(fields.keywords);

        for(var i=0; i < fields.keywords.length; i++){
            fields.keywords[i] = fields.keywords[i].trim();
        }
        
        console.log(JSON.stringify(fields));
        $.ajax({
            method:     'POST',
            url:        'api/resources',
            data:       fields,
            dataType:   'html',
            success:    function(response, status){
                $('#step1').hide();
                $('#success').show();
                //console.log(status);
                //console.log(response);
            },
            error:      function(err){
                alert('Something went wrong adding the resource. Reload the page and try again.');
                //console.log('ajax error');
                //console.log(err);
            }
        });
    };

       
});
