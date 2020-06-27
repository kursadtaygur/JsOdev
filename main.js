// LeetCode

//496. Next Greater Element I:You are given two arrays (without duplicates) nums1 and nums2 where nums1’s elements are subset of nums2.
//Find all the next greater numbers for nums1's elements in the corresponding places of nums2.
//The Next Greater Number of a number x in nums1 is the first greater number to its right in nums2. If it does not exist, output -1 for this number.

var nextGreaterElement = function(nums1, nums2) {
    const x = num => {
        const start = nums2.indexOf(num);
        if(start === -1) return start;
        for(let i = start; i < nums2.length; i++) {
            if(nums2[i] > num) return nums2[i];
        }
        return -1;
    }
    return nums1.map(x);
};

//1356. Sort Integers by The Number of 1 Bits:Given an integer array arr. 
//You have to sort the integers in the array in ascending order 
//by the number of 1's in their binary representation and in case of two or more integers have the same number of 1's you have to sort them in ascending order.
//Return the sorted array.

// tutulacak not nesnesi {sayı :1 bit sayısı}
const nesne = {};

function sortByBits(arr) {
    // diziyi özel karıştırıcıya göre sıralama
    arr.sort((a, b) => {
        if (!(a in nesne)) nesne[a] = bits(a);
        if (!(b in nesne)) nesne[b] = bits(b);
        // aynı miktarda olup olmaması
        if (nesne[a] === nesne[b]) {
            // artan şekilde sıralama
            return a - b;
        }
        else {
            // 1 bitlik sayıya göre artan sıralama
            return nesne[a] - nesne[b];
        }
    });
    return arr;
}

function bits(n) {
    // bit sayısı
    let x = 0;
    // n=0 olana kadar
    while (n > 0) {
        x += n & 1;
        // sağa kaydır
        n >>= 1;
    }
    return x;
}

//226. Invert Binary Tree: Invert a binary tree.

var invertTree = function(root) {
    let temp;
    const invert = (node) => {
        if (node && !node.visited) {
            node.visited = true
            temp = node.left
            node.left = node.right
            node.right = temp
            invert(node.left)
            invert(node.right)
        }
        
    }
    
    invert(root)
    return root
};

//476. Number Complement: Given a positive integer num, output its complement number. The complement strategy is to flip the bits of its binary representation.

var findComplement = function(num) {
    var n = 2;
    while (n <= num) n *= 2;
    return num ^ (n - 1);
};

//136. Single Number: Given a non-empty array of integers, every element appears twice except for one. Find that single one.

var singleNumber = function(nums) {
    const x = {};
    nums.forEach(y => {
        if (!x[y]) {
            x[y] = true;
        } else {
            delete x[y];
        }
    });
    return Object.keys(x)[0];
};

// ProjectEuler

//Sum square difference : The sum of the squares of the first ten natural numbers is,
//12+22+...+102=385
//The square of the sum of the first ten natural numbers is,
//(1+2+...+10)2=552=3025
//Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025−385=2640.
//Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

function firstHundo() {
    let squaredSum = 0;
    let sumSquared = 0;
  
    for (let i = 1; i <= 100; i++) {
      sumSquared += i;
      squaredSum += (i*i);
      
    }
    return (sumSquared * sumSquared) - squaredSum;
  }
  
  firstHundo();

//Power digit sum: 215 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
//What is the sum of the digits of the number 21000?

function calculateSum(number, pow) {
    let string = String(BigInt(number) ** BigInt(pow));
    let result = 0n;
    for(let i = 0; i < string.length; i++) {
        let num = BigInt(string[i]) 
        result += num
    }
    result = parseInt(result)
    return result
}

//Double-base palindromes: The decimal number, 585 = 10010010012 (binary), is palindromic in both bases.
//Find the sum of all numbers, less than one million, which are palindromic in base 10 and base 2.

let sum = 0;
for(let i = 1; i <= 1000000; i+=2){
    let b10 = Array.from(i.toString());
    let b2 = Array.from(i.toString(2));
    let b10r = b10.slice(0).reverse()
    let b2r = b2.slice(0).reverse()

    if(b10.join() === b10r.join() && b2.join() === b2r.join())
        sum += i
}

console.log(sum)

//Counting summations: It is possible to write five as a sum in exactly six different ways:
//4 + 1
//3 + 2
//3 + 1 + 1
//2 + 2 + 1
//2 + 1 + 1 + 1
//1 + 1 + 1 + 1 + 1
//How many different ways can one hundred be written as a sum of at least two positive integers?

function start() {
    var cnt = 0;
    var N = 100;

    for(var k = 2; k <= N; k++) {
        var term = count(N, k, 1);
        cnt += term;
    }

    document.write("count: " + (cnt) + "<br>");
}

function count(N, k, index) {
    if(N < k) {
        return 0;
    } else if ((k == 1) || (N == k)) {
        return 1;
    }

    var ubound = Math.floor(N/k);
    var cnt = 0;
    for(var i = index; i <= ubound; i++) {
        cnt += count(N-i, k-1, i);
    }

    return cnt;
}

//Singleton difference: The positive integers, x, y, and z, are consecutive terms of an arithmetic progression. Given that n is a positive integer, the equation, x2 − y2 − z2 = n, has exactly one solution when n = 20:
//132 − 102 − 72 = 20
//In fact there are twenty-five values of n below one hundred for which the equation has a unique solution.
//How many values of n less than fifty million have exactly one solution?

var ans = (function(n) {
	function Primes() {}
	 Primes.prototype.sieve = function(m) {
        var primes = new Array(m);
        for (var x = 4; x < m; x += 2) {
            primes[x] = false;
        }
        var m_max = Math.sqrt(m) | 0;
        for (var x = 3; x <= m_max; x += 2) {
            if (primes[x] === undefined) {
                for (var y = (x << 1); y < m; y += x) {
                    primes[y] = false;
                }
            }
        }
        var result = [];
        for (var x = 2; x < m; x++) {
            if (primes[x] === undefined) {
                result.push(x);
            }
        }
        return result;
    };

    var primes = (new Primes()).sieve(n);
    var result = 0;

    if (n > 16) {
        result += 2;
    } else if (n > 4) {
        result += 1;
    }

    var max_16 = (n / 16) | 0,
        max_4 = (n / 4) | 0;

    primes.forEach(function(prime) {
        if (prime % 4 === 3) result += 1;
        if (prime <= max_16) result += 2;
        else if (prime <= max_4) result += 1;
    });

    return result;
})(50000000);

console.log(ans);