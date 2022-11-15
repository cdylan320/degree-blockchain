function get_value(input_id,field_id){
   return document.getElementById(input_id+"_"+field_id+"_input").value
}

function submit_handler(io_field,fields){
    var dict  = new Object();

    for (field of fields)
    {
        dict[field]=get_value(io_field,field)

    
    }
    
    output_handler(io_field,dict)
}
function data_dump(output_id,dict){
    let key_list=Object.keys(dict);
    let ret="---"+output_id+"---<br>";
    for (key of key_list){
        
        ret+=key+": "+dict[key]+"<br>"
    }
    return ret
}
function parse_courses(courses){
    num_char=courses.split(",").length-1
    for (i=0;i<num_char;i++)
    {
        if (i%2)
        {
            //console.log("keep as ,")
            courses=courses.replace(",",".")
        }
        else
        {
            //console.log("change to:")
            courses=courses.replace(",",":")
        }

    }
   courses= courses.replaceAll(".",",")
   //console.log(courses)
    return courses
}
async function output_handler(output_id,dict){
    var key_list=Object.keys(dict)
    let output=""
    switch(output_id){
        case "Hide_Course":
            output="<div class='goodResponse'>Course Hidden!</div>"
            try{
                await hideCourse(dict["Course_Name"])
            }catch(error)
            {
               
                output="<div class='badResponse'>Permission Denied</div>" 
            }

        break;
        case "Set_Admin":
            output="<div class='goodResponse'>Admin Set!</div>"
            try{
                await setAdmin(dict["Person_Id"].replaceAll("\"",""))
            }catch(error)
            {

                output="<div class='badResponse'>Permission Denied</div>" 
            }
            
        break;
        case "Set_Course":
            output="<div class='goodResponse'>Course Set!</div>"
            try{
                await setCourse(dict["Student_Id"].replaceAll("\"",""),dict["Course_Name"],dict["Grade"])
            
            }catch(error){

                output="<div class='badResponse'>Permission Denied</div>"
            }

        break;
        case "Set_Graduation":
            output="<div class='goodResponse'>Graduation Set!</div>"
            try{
                await setGraduated(dict["Student_Id"].replaceAll("\"",""))
            }catch(error)
            {

                output="<div class='badResponse'>Permission Denied</div>"
            }
        
        break;
        case "Set_Student":
            output="<div class='goodResponse'>Student Set!</div>"
            try{
                await setStudent(dict["Student_Id"].replaceAll("\"",""))
            }catch(error)
            {
 
                output="<div class='badResponse'>Permission Denied</div>"
            }
        break;
        case "Show_Course":
            output="<div class='goodResponse'>Course Showing!</div>"
            try{
                await showCourse(dict["Course_Name"])
            }catch(error){

                output="<div class='badResponse'>Permission Denied</div>"
            }
        break;
        case "Show_All_Courses":
            try{
            output= await showAllCourses(dict['Student_Id'].replaceAll("\"",""))
            output = parse_courses(output.toString())
            output= output.toString().replaceAll(":0","<i>hidden-course</i>").replaceAll(",",", ")
            }catch(error){

                output="<div class='badResponse'>Permission Denied</div>"
            }
        break;
        case "Graduation_Status":
            try{
            output=await graduationStatus(dict["Student_Id"].replaceAll("\"",""))
            }catch(error){

                output="<div class='badResponse'>Permission Denied</div>"
            }
        break;
        default:
        console.log("default:"+data_dump(output_id,dict))
        document.getElementById(output_id+"_output").innerHTML=data_dump(output_id,dict)
        return
        break;
       
    }
    document.getElementById(output_id+"_output").innerHTML=output
   // document.getElementById(output_id+"_output").innerHTML+=value
}
function display_string(input){
    return input.replaceAll("_"," ");
}
function array_to_string(input){
    let ret="[{arg}]"
    let arg=""
    let element="'{element}',"
    for(a in input){
        arg+=element
    }
   
    arg=arg.slice(0,-1);

    for (arg_element of input){
        arg = arg.replace("{element}",arg_element.toString())

    }
    return ret.replace("{arg}",arg)
}
function html_input(class_label,label,fields){
    field_quentity=fields.length
    
    let str=
    `
    <form action="javascript:void(0);" class="{class_label}" onsubmit="submit_handler('{label}',{field_array})" >
    Access: {class_label}<br>
    {input_html}
    <input type="submit" value="{displayLabel}">
    <div class="output" id="{label}_output">
    </div>
    </form><br>
    
    `
    let input_html_template='<input type="input" placeholder="{field_label_display}" id="{label}_{field_label}_input"><br>'
    let input_html=""
    for (var i=0;i<field_quentity;i++){
        input_html+=input_html_template.replace("{field_label}",fields[i]).replace("{field_label_display}",display_string(fields[i]))
    }
    
    document.write(str.replace("{input_html}",input_html).replaceAll("{label}",label).replaceAll("{displayLabel}",display_string(label)).replaceAll("{field_array}",array_to_string(fields)).replaceAll("{class_label}",class_label))
}