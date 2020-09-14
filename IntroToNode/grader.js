function average(list){
	sum=0;
	for(var i=0;i<list.length;i++){
		sum+=list[i];
	}
	sum=sum/list.length;
	console.log(Math.round(sum));
}

var scores=[90,89,98,100,100,86,94];
average(scores);