import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>`;

const test = [0, 1, 2, 3, 4, 5];
// array.map((elem, index, array) => {})

function mapNative<T>(
  array: T[],
  cb: (elem: T, index: number, array: Array<T>) => T
): T[] {
  return array.reduce((acc: T[], elem: T, index: number) => {
    acc.push(cb(elem, index, array));
    return acc;
  }, []);
}

console.log(mapNative<number>(test, (elem) => elem * 2));

function filterNative<T>(
  array: T[],
  cb: (elem: T, index: number, array: T[]) => boolean
): T[] {
  return array.reduce((acc, elem, index) => {
    if (cb(elem)) {
      acc.push(elem);
    }
    return acc;
  }, []);
}

console.log(filterNative<number>(test, (elem) => elem % 2 === 0));

// PromiseAllNative

function promiseAllNative(promises: Array<Promise>): Promise<any> {
  return new Promise(resolve, reject) => {
    const resArray = [];
    let count = 0;
    promises.forEach(promise => {
      promise
        .catch(err => {
          reject(err);
      })
        .then(res => {
        resArray[count] = res;
        count++;

        if (promises.length === count) {
          resolve(resArray);
        }
      })
    });
  }
}


function promiseAllSettledNativ(promises: Array<Promise>): Promise {
  return new Promise (resolve, reject) => {
    const resArray = [];
    let count = 0;
    promises.map((promise) => {
      promise
      .then(res => {
        let resObject = {
          value: res,
          status: "fulfilled",
        }
        resArray[count] = resObject;
        count++;

        if (resArray.length === count) {
          resolve(resArray);
        }
      })
      .catch(error => {
        let resObject = {
          value: res,
          reason: rejected,
        }
        resArray[count].push(resObject);
      })
    })
  }
}