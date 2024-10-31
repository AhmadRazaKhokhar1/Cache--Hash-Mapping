const express = require('express');
const PORT = process.env.PORT || 9000
const app = express();
app.get('/', (req, res) => {
    try {
        console.log({ msg: "Hello World" })
        class HashTable {
            constructor(size) {
                this.table = new Array(size);
                this.size = size;
            }
            /**
             * Hash function is used to create a valid index for 
             * the key, Each character of of the 'key' is passed
             * in a for loop to get their unicode values, Unicode
             * gets a unique integer for example "A" has unicode 
             * value of 65 and "B" has 66., etc (similarly for the
             * other charcters like symbols and numbers like number,
             * symbols, ..), At the end, we take a % of total unicodes
             * with the size to reduce the values to a valid index.
             *  */

            // Hashing the key to get a valid index

            hash(key) {
                let total = 0;
                for (let i = 0; i < key.length; i++) {
                    console.log({i})
                    total += key.charCodeAt(i) * i;
                    console.log({
                        unicode: key.charCodeAt(i),
                        key
                    })
                    /**  taking a unicode of each char and 
                     * storing it inside the total
                     */
                }
                /**  Now, reducing the value to valid index 
                /**  that is in-between given size (Memory)
                 **/
                console.log({total})
                console.log({reducedTotal:(total % this.size)})
                return (total % this.size);
            }
            /** Set function to store a key & value paid on 
             * a valid index of the table
             */
            set(key, value) {
                let index = this.hash(key);
                this.table[index] = value;
            }
            /**
             * Get function to get the 'set' value from the 
             * valid index of the table
             */
            get(key) {
                let index = this.hash(key);
                return this.table[index]
            }
            /**
             *  Now a delete function to remove the key-value pair
             * from the table with the help of its index that is
             * driven from the hash method
             */
            delete(key) {
                let index = this.hash(key);
                this.table[index] = undefined;
            }
        }

        /**
         * Testing the Hash Table
         */
        const hashTable = new HashTable(5000);
        /**  passing the 50 slots of size for hash-table to consume
        a defined memory
        */
        hashTable.set('str', 'Ahmad'); // storing a key-val pair for string
        hashTable.set('rst', 'Raza'); // storing a key-val pair for string
        hashTable.set('int', 50); // storing an integer 
        hashTable.set('sym', '$') // storing a uniqye symbol
        hashTable.set('bool', true) // storing a boolean

        // declaring vars for each value

        // fetching each value with their respective key
        let str = hashTable.get('str');
        let rst = hashTable.get('rst');
        let int = hashTable.get('int');
        let sym = hashTable.get('sym');
        let bool = hashTable.get('bool');

        // all items log
        console.log({ str,rst, int, sym, bool })

        /**
         * Deleting an item from the table
         */
        console.log({
            msg: "calling delete method for 'sym' to remove its valeu from the table"
        })
        hashTable.delete('sym');

        // re-declaring new vars
        let str_n = hashTable.get('str');
        let rst_n = hashTable.get('rst');
        let int_n = hashTable.get('int');
        let sym_n = hashTable.get('sym');
        let bool_n = hashTable.get('bool');

        // after deleting one item, log
        console.log({ str_n,rst_n, int_n, sym_n, bool_n })

        res.json([{ str,rst, int, sym, bool }, { str_n, rst_n, int_n, sym_n, bool_n }]);
    } catch (error) {
        console.log({ error });
        throw Error({ error })
    }
})
app.listen(PORT, () => {
    console.log(`The server is live at http://locahost:${PORT}`)
})