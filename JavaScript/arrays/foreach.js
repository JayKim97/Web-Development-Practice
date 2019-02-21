function myForEach(arr,func){
    for(var i = 0;i<arr.length; i++){
        func(arr[i]);
    }
}

var nums=[1,2,3,4,5];
myForEach(nums,alert);