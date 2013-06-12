function parseWebsite(url)
{
	var str = url;
	var begin = 0;
	var end = 0;
	var find_before_string = "ProjectId\":\"";
	var find_after_string = "\",\"ProjectName\":\"";
	var find_project_name = "\",\"ProjectNameShort\"";
	var arr = new Array();
	var index = 0;
	var n;
	var number;


	while(begin != -1 && end != -1)
	{
		// ProjectId
		begin = str.indexOf(find_before_string, end);
	
		//checks if the pointer is empty
		if(begin == -1)
		{
			break;
		}

		end = str.indexOf(find_after_string, begin);

		n = find_before_string.length + begin;

		number = str.substr(n, end - n);

		arr.push(number);


		//ProjectName
		// begin of the project name
		n = end + find_after_string.length;

		// end of the project name
		end = str.indexOf(find_project_name, n);

		number = str.substr(n, end - n);
		arr.push(number);
	}
//for testing
allert(arr);
}
