let seed;
function initializeseed(seedValue)
{
	seed=seedValue;
}
function getrnd(l,r)
{
	seed^=(seed<<11);
	seed^=(seed>>4);
	seed^=(seed<<5);
	seed^=(seed>>14);
	return seed%(r-l+1)+l;
}
function rotation(n,seedValue)
{
	initializeseed(seedValue);
	let a=new Array(n);
	for(let i=0;i<n;i++)
	{
		a[i]=i;
	}
	let times=getrnd(n*2,n*3);
	for(let i=0;i<times;i++)
	{
		let l=getrnd(0,n-1);
		let r=getrnd(0,n-1);
		[a[l],a[r]]=[a[r],a[l]];
	}
	return a;
}
function shuffle_encrypt(str,seed) {
	const permutation=rotation(str.length,seed);
	let result='';
	for (let i=0;i<str.length;i++)
	{
		result+=str[permutation[i]];
	}
	return result;
}
function shuffle_decrypt(str,seed)
{
	const permutation=rotation(str.length,seed);
	let result='';
	for (let i=0;i<str.length;i++)
	{
		const index=permutation.indexOf(i);
		result+=str[index];
	}
	return result;
}
