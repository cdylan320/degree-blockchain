
async function hideCourse(course_name){
		    	
    const output = await contract.methods.hideCourse(course_name).send({from:web3.eth.defaultAccount,gas:3000000})
    return output
}

async function setAdmin(person_id){
		    	
    const output = await contract.methods.setAdmin(person_id.toString()).send({from:web3.eth.defaultAccount,gas:3000000})
    return output
}

async function setCourse(student_id,course_name,course_gpa){
		    	
    //const output = await contract.methods.setCourse(student_id.toString(),course_name.toString(),parseInt(course_gpa)).call()
    output = await contract.methods.setCourse(student_id,course_name,course_gpa).send({from:web3.eth.defaultAccount,gas:3000000})
    return output
}

async function setGraduated(student_id){
		    	
    const output = await contract.methods.setGraduated(student_id.toString()).send({from:web3.eth.defaultAccount,gas:3000000})
    return output
}

async function setStudent(student_id){
		    	
    const output = await contract.methods.setStudent(student_id.toString()).send({from:web3.eth.defaultAccount,gas:3000000})
    return output
}

async function showCourse(course_name){
		    	
    const output = await contract.methods.showCourse(course_name.toString()).send({from:web3.eth.defaultAccount,gas:3000000})
    return output
}

async function showAllCourses(id){
		    	
    const output = await contract.methods.showAllCourses(id.toString()).call()
    return output
}
async function graduationStatus(id){
		    	
    const output = await contract.methods.students(id.toString()).call()
    return output['graduationStatus']
}
//contract.methods.setCourse("0x51aB1Aa6749e4fC23825f1C7b36916928212aDe4","math"),3200).call()
//contract.methods.showAllCourses("0x51aB1Aa6749e4fC23825f1C7b36916928212aDe4")