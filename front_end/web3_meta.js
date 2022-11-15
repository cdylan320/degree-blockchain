

var abi=[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "students",
    "outputs": [
      {
        "internalType": "address",
        "name": "studentPerson",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "graduationStatus",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "adminPerson",
        "type": "address"
      }
    ],
    "name": "setAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "studentPerson",
        "type": "address"
      }
    ],
    "name": "setStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "studentPerson",
        "type": "address"
      }
    ],
    "name": "setGraduated",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "studentPerson",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "courseName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "courseGPA",
        "type": "uint256"
      }
    ],
    "name": "setCourse",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "studentPerson",
        "type": "address"
      }
    ],
    "name": "showAllCourses",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "gpa",
            "type": "uint256"
          }
        ],
        "internalType": "struct Degree.Course[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "courseName",
        "type": "string"
      }
    ],
    "name": "hideCourse",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "courseName",
        "type": "string"
      }
    ],
    "name": "showCourse",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]


const web3 = new Web3('http://127.0.0.1:7545'||'ws://127.0.0.1:7545');

var contract_address = "0xd363188C3A746D22E7B42Ca1b7eD736Aeedeb321";


web3.eth.defaultAccount = prompt("Userid:").replaceAll("\"","");
contract = new web3.eth.Contract(abi,contract_address, web3.eth.defaultAccount);


console.log(web3.eth.getAccounts())


