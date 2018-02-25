from boa.blockchain.vm.Neo.Runtime import Notify, GetTrigger, CheckWitness
from boa.blockchain.vm.Neo.Action import RegisterAction
from boa.blockchain.vm.Neo.TriggerType import Application, Verification

from boa.blockchain.vm.Neo.TransactionType import InvocationTransaction
from boa.blockchain.vm.Neo.Transaction import *

from boa.blockchain.vm.System.ExecutionEngine import GetScriptContainer, GetExecutingScriptHash
from boa.blockchain.vm.Neo.TriggerType import Application, Verification
from boa.blockchain.vm.Neo.Output import GetScriptHash, GetValue, GetAssetId
from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put, Delete

OWNER = b'\x41\x58\x33\x7a\x76\x5a\x76\x45\x50\x58\x31\x75\x4d\x69\x6b\x45\x68\x64\x4b\x32\x59\x39\x38\x66\x5a\x33\x4e\x69\x56\x54\x6b\x79\x34\x56'


NEO_ASSET_ID = b'\x9b|\xff\xda\xa6t\xbe\xae\x0f\x93\x0e\xbe`\x85\xaf\x90\x93\xe5\xfeV\xb3J\\"\x0c\xcd\xcfn\xfc3o\xc5'
GAS_ASSET_ID = b'\x36\x30\x32\x63\x37\x39\x37\x31\x38\x62\x31\x36\x65\x34\x34\x32\x64\x65\x35\x38\x37\x37\x38\x65\x31\x34\x38\x64\x30\x62\x31\x30\x38\x34\x65\x33\x62\x32\x64\x66\x66\x64\x35\x64\x65\x36\x62\x37\x62\x31\x36\x63\x65\x65\x37\x39\x36\x39\x32\x38\x32\x64\x65\x37'

def Main(args):

    print("Do Withdraw Test")

    trigger = GetTrigger()

    if trigger == Verification():

        print("doing verification")
        return True


        # check to see if the withdrawer is the owner

        is_owner = CheckWitness(OWNER)

        # always allow owner to withdraw

        if is_owner:
            can_widthraw = CanClaimGas()
            return can_widthraw

        else:
            can_widthraw = CanWithdrawNeo()
            return can_widthraw

    elif trigger == Application():
        print("doing application")

        operation = args[0]

        if operation == 'hodl':
            print("Hodling engaged!")
            deposit = DepositNeo()

            return deposit
    return False

def DepositNeo():
    # get reference to the tx the invocation is in
    tx = GetScriptContainer()

    references = tx.References

    if len(references) < 1:
        print("no neo attached")
        return False

    # we need to determine who sent the tx
    reference = references[0]
    sender = GetScriptHash(reference)

    # this will keep track of how much neo was deposited
    value = 0

    output_asset_id = GetAssetId(reference)

    if output_asset_id != NEO_ASSET_ID:
        print("Must deposit NEO")
        return False

    # this is the contract's address
    receiver = GetExecutingScriptHash()

    # go through all the outputs
    # and check if the receiver is the contract
    # if that is true, we add the value of the output to the
    # total sum that was deposited

    for output in tx.Outputs:
        shash = GetScriptHash(output)
        if shash == receiver:
            output_val = GetValue(output)
            value = value + output_val

    if value > 0:

        print("neo was deposited")
        Notify(value)

        # now we know value was deposited from the sender

        context = GetContext()

        # check the current balance of the sender
        current_balance = Get(context, sender)
        print("current balance...")
        Notify(current_balance)

        new_balance = current_balance + value

        print("new balance..")
        Notify(new_balance)

        Put(context, sender, new_balance)

        print("deposited")

        return True

    return False

def CanWithdrawNeo():

    print("[can withdraw]")

    tx = GetScriptContainer()

    type = GetType(tx)

    print("[can withdraw] got tx type...")

    if type == 209:
        print("[can withdraw] Is invocation!!")

        # this is the contract's address
        sender_addr = GetExecutingScriptHash()

        withdrawal_amount = 0

        receiver_addr = bytearray(0)

        # go through the outputs of the tx
        # and find ones that are neo
        # and also the receiver cannot be the contract ( sender_addr )
        for output in tx.Outputs:
            shash = GetScriptHash(output)

            output_asset_id = GetAssetId(output)

            if output_asset_id == NEO_ASSET_ID:

                output_val = GetValue(output)

                if shash != sender_addr:

                    print("[can withdraw] output is to receiver")
                    receiver_addr = shash

                    withdrawal_amount = withdrawal_amount + output_val

                    Notify(withdrawal_amount)
                    Notify(output)

                else:

                    print("[can withdraw] output is to contract sender addr, subtract from withdraw total")

                    withdrawal_amount = withdrawal_amount - output_val

                    Notify(output)
            else:

                print("[can withdraw] output is not neo")
                Notify(output)

        # we check recevier addr and amount

        if len(receiver_addr) > 0:

            print("[can withdraw] receiver addr is valid")
            Notify(receiver_addr)

            context = GetContext()

            current_balance = Get(context, receiver_addr)

            print("[can withdraw] current balance")
            Notify(current_balance)
            Notify(withdrawal_amount)

            if withdrawal_amount <= current_balance:

                print("[can withdraw] withdrawl amount il less than balance")
                return True

            else:

                print("[can withdraw] not enough to witdraw")
        else:

            print("[can withdraw] receiver addr not set")
    else:

        print("[can withdraw] tx is not invocation tx. return false")

    return False

def CanClaimGas():
    print("Withdrawing Donations")

    tx = GetScriptContainer()
    tpe = GetType(tx)
    print("Type: ", tpe)

    for output in tx.Outputs:
        shash = GetScriptHash(output)
        output_asset_id = GetAssetId(output)

        if output_asset_id == GAS_ASSET_ID:
            print("Asset is Gas")

        else:

            return False

    return True
