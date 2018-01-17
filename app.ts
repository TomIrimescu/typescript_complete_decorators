function logged(constructorFn: Function) {
  console.log(constructorFn);
}

@logged
class Person {
  constructor() {
    console.log("Hi!");
  }
}

// Factory
function logging(value: boolean) {
  return value ? logged : () => null;
}

@logging(true)
class Car {
}

// Advanced
function printable(constructorFn: Function) {
  constructorFn.prototype.print = function () {
    console.log(this);
  }
}

@logging(false)
@printable
class Plant {
  name = "Green Plant";
}

const plant = new Plant();
(<any>plant).print();


// Method Decorator
function editable(value: boolean) {
  return function (_target: any, _propName: string, descriptor: PropertyDescriptor) {
    descriptor.writable = value;
  }
}

// Property Decorator
function overwritable(value: boolean) {
  return function (_target: any, _propName: string): any {
    const newDescriptor: PropertyDescriptor = {
      writable: value
    };
    return newDescriptor;
  }
}

class Project {
  @overwritable(true) // property decorator
  projectName: string;
  
  constructor(name: string) {
    this.projectName = name;
  }
  
  @editable(true) // method decorator
  calcBudget() {
    console.log(1000);
  }
}

const project = new Project("Super Project");
project.calcBudget();
project.calcBudget = function () {
  console.log(2000);
};
project.calcBudget();
console.log(project);

// Parameter Decorator
function printInfo(target: any, methodName: string, paramIndex: number) {
  console.log("Target: ", target);
  console.log("methodName: ", methodName);
  console.log("paramIndex: ", paramIndex);
}

class Course {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  printStudentNumbers(mode: string, @printInfo printAll: boolean) {
    if (printAll) {
      console.log(10000);
    } else {
      console.log(2000);
    }
  }
}
const course = new Course("Super Course");
course.printStudentNumbers("anything", true);
course.printStudentNumbers("anything", false);















