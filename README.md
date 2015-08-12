# Node.js calculator
The application decode base64 encoded calculation and response with correct answer.

### Usage
1. Initial steps
```
 $ git clone
 $ cd calculus
 $ npm install
 $ (sudo) node.js index.js
```
2. Make an example calculation: i.e. 2 * (23/(3 * 3))- 23 * (2 * 3)
3. Base64 encode: MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=
4. On you favorite browser go to:
http://localhost/calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=
5. Result:
```
{
error: false,
result: -132.88888888888889
}
```
